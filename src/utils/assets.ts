import fs from 'node:fs';
import nodePath from 'node:path';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

export const IMAGE_QUALITY = 70;
export const IMAGE_WIDTHS = [320, 480, 640, 960, 1280];
const ORIGINAL_MAX_BYTES = 16 * 1024;
const KEEP_ORIGINAL = new Set([
  '/assets/projects/ascii-shader/ascii-shader-1.webp',
  '/assets/projects/ascii-shader/ascii-shader-2.webp',
]);

const MOBILE_QUERY = '(max-width: 1000px)';

export const IMAGE_SIZES = {
  profile: `${MOBILE_QUERY} 86vw, 27vw`,
  card: `${MOBILE_QUERY} 53vw, 28vw`,
  gallery: `${MOBILE_QUERY} 82vw, 32vw`,
};

export const BACKGROUND_WIDTHS = {
  profile: 640,
  card: 800,
  sidebarCard: 400,
  logo: 640,
};

export type ImageVariant = keyof typeof IMAGE_SIZES;
export type BackgroundVariant = keyof typeof BACKGROUND_WIDTHS;

const images = import.meta.glob<ImageMetadata>('../assets/**/*.webp', { eager: true, import: 'default' });

export function findAsset(path: string): ImageMetadata | undefined {
  return images[`..${path}`];
}

export function asset(path: string): ImageMetadata {
  const image = findAsset(path);
  if (!image) throw new Error(`Image not found in src/assets: ${path}`);
  return image;
}

export function keepOriginal(path: string): boolean {
  return KEEP_ORIGINAL.has(path) || fs.statSync(nodePath.join(process.cwd(), 'src', path)).size <= ORIGINAL_MAX_BYTES;
}

async function imageUrl(path: string, width: number): Promise<string> {
  const image = asset(path);
  if (keepOriginal(path) || width >= image.width) return image.src;
  const { src } = await getImage({ src: image, width, quality: IMAGE_QUALITY });
  return src;
}

export async function backgroundImage(path: string, variant: BackgroundVariant): Promise<string> {
  const width = BACKGROUND_WIDTHS[variant];
  const [x1, x2] = await Promise.all([imageUrl(path, width), imageUrl(path, width * 2)]);
  return x1 === x2 ? `url('${x1}')` : `image-set(url('${x1}') 1x, url('${x2}') 2x)`;
}
