import sharp from 'sharp';

export async function getImageSize(publicPath: string): Promise<{ width: number; height: number }> {
  const { width, height } = await sharp(`public${publicPath}`).metadata();
  return { width, height };
}
