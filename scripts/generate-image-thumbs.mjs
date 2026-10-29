import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const ROOTS = ['public/assets/profile', 'public/assets/projects'];
const MAX_SIZE = 900;
const THUMB_SUFFIX = '-thumb.webp';
const QUALITIES = [70, 60, 50, 40];

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
};

const toThumbPath = (filePath) =>
  filePath.replace(/\.webp$/i, THUMB_SUFFIX);

const shouldSkip = async (filePath, outputPath) => {
  if (process.env.REBUILD_THUMBS === '1') {
    return false;
  }
  try {
    const [inputStats, outputStats] = await Promise.all([
      fs.stat(filePath),
      fs.stat(outputPath),
    ]);
    return outputStats.mtimeMs >= inputStats.mtimeMs;
  } catch {
    return false;
  }
};

const encodeThumb = async (filePath, outputPath, quality) => {
  await sharp(filePath)
    .resize({
      width: MAX_SIZE,
      height: MAX_SIZE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 6,
      smartSubsample: true,
      alphaQuality: quality,
    })
    .toFile(outputPath);
};

const createThumb = async (filePath) => {
  const outputPath = toThumbPath(filePath);
  if (await shouldSkip(filePath, outputPath)) {
    return null;
  }

  const inputStats = await fs.stat(filePath);
  let lastSize = Number.POSITIVE_INFINITY;

  for (const quality of QUALITIES) {
    await encodeThumb(filePath, outputPath, quality);
    const outputStats = await fs.stat(outputPath);
    lastSize = outputStats.size;
    if (outputStats.size < inputStats.size) {
      return outputPath;
    }
  }

  return outputPath;
};

const run = async () => {
  const roots = await Promise.all(
    ROOTS.map(async (root) => {
      try {
        await fs.access(root);
        return root;
      } catch {
        return null;
      }
    })
  );

  const files = (
    await Promise.all(
      roots.filter(Boolean).map((root) => walk(root))
    )
  )
    .flat()
    .filter(
      (filePath) =>
        filePath.toLowerCase().endsWith('.webp') &&
        !filePath.toLowerCase().endsWith(THUMB_SUFFIX)
    );

  let created = 0;
  for (const filePath of files) {
    const outputPath = await createThumb(filePath);
    if (outputPath) {
      created += 1;
      process.stdout.write(`Created ${outputPath}\n`);
    }
  }

  process.stdout.write(
    created ? `Done. ${created} thumbnails created.\n` : 'Done. No changes.\n'
  );
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
