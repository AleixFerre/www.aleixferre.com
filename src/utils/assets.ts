import fs from 'node:fs';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { MOBILE_QUERY } from './breakpoints';

export const IMAGE_QUALITY = 70;
export const IMAGE_WIDTHS = [320, 480, 640, 960, 1280];
const ORIGINAL_MAX_BYTES = 16 * 1024;

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
export type ImageSource = string | ImageMetadata;

const images = import.meta.glob<ImageMetadata>('../assets/**/*.webp', { eager: true, import: 'default' });

export function findAsset(path: string): ImageMetadata | undefined {
  return images[`..${path}`];
}

export function asset(source: ImageSource): ImageMetadata {
  if (typeof source !== 'string') return source;
  const image = findAsset(source);
  if (!image) throw new Error(`Image not found in src/assets: ${source}`);
  return image;
}

function sourceFile(image: ImageMetadata): string {
  const { fsPath } = image as ImageMetadata & { fsPath?: string };
  if (!fsPath) throw new Error(`Image has no source file: ${image.src}`);
  return fsPath;
}

export function shouldKeepOriginal(image: ImageMetadata): boolean {
  return fs.statSync(sourceFile(image)).size <= ORIGINAL_MAX_BYTES;
}

async function imageUrl(image: ImageMetadata, width: number): Promise<string> {
  if (shouldKeepOriginal(image) || width >= image.width) return image.src;
  const { src } = await getImage({ src: image, width, quality: IMAGE_QUALITY });
  return src;
}

export async function backgroundImage(source: ImageSource, variant: BackgroundVariant): Promise<string> {
  const image = asset(source);
  const width = BACKGROUND_WIDTHS[variant];
  const [x1, x2] = await Promise.all([imageUrl(image, width), imageUrl(image, width * 2)]);
  return x1 === x2 ? `url('${x1}')` : `image-set(url('${x1}') 1x, url('${x2}') 2x)`;
}
