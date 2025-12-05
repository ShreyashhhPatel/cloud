// Image paths - all images from the img folder (PNG format)
export const images = [
  '/img/IMG_0096.png',
  '/img/IMG_0138.png',
  '/img/IMG_0156.png',
  '/img/IMG_0188.png',
  '/img/IMG_0202.png',
  '/img/IMG_0265.png',
  '/img/IMG_0289.png',
  '/img/IMG_0312.png',
  '/img/IMG_0352.png',
  '/img/IMG_0472.png',
  '/img/IMG_0473.png',
  '/img/IMG_0475.png',
  '/img/IMG_0476.png',
  '/img/IMG_0695.png',
  '/img/IMG_0698.png',
  '/img/IMG_0700.png',
  '/img/IMG_0743.png',
  '/img/IMG_0753.png',
  '/img/IMG_0771.png',
  '/img/IMG_0861.png',
  '/img/IMG_0863.png',
  '/img/IMG_0896.png',
  '/img/IMG_0985.png',
  '/img/IMG_0986.png',
  '/img/IMG_0988.png',
  '/img/IMG_0992.png',
  '/img/IMG_1048.png',
  '/img/IMG_1066.png',
  '/img/IMG_1069.png',
  '/img/IMG_1072.png',
  '/img/IMG_1093.png',
  '/img/IMG_1144.png',
  '/img/IMG_1220.png',
  '/img/IMG_1223.png',
  '/img/IMG_1236.png',
  '/img/IMG_1247.png',
  '/img/IMG_1248.png',
  '/img/IMG_1253.png',
  '/img/IMG_1261.png',
  '/img/IMG_1262.png',
  '/img/IMG_1266.png',
  '/img/IMG_1267.png',
  '/img/IMG_1268.png',
  '/img/IMG_1269.png',
  '/img/IMG_1272.png',
  '/img/IMG_5717.png'
] as const

export function getRandomImage(): string {
  return images[Math.floor(Math.random() * images.length)]
}

export function getImageAtIndex(index: number): string {
  return images[index % images.length]
}

export function getAllImages(): readonly string[] {
  return images
}
