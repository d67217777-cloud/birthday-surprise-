import type { GalleryImage, MemoryImage, ImageAsset, ImageId } from '../types';

const teaserPhotos = [
  { id: 1383939, caption: 'A whisper of what is to come...' },
  { id: 1763261, caption: 'Every great story begins with a moment.' },
  { id: 1772123, caption: 'Some surprises are worth waiting for.' },
  { id: 1813466, caption: 'The best is yet to arrive...' },
  { id: 1858175, caption: 'One more reason to smile...' },
];

export function getTeaserImages(): GalleryImage[] {
  return teaserPhotos.map((photo, i) => ({
    id: `teaser-${i + 1}`,
    src: `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=900`,
    alt: `Teaser ${i + 1}`,
    caption: photo.caption,
  }));
}

const memoryPhotos = [
  { id: 1444416, caption: 'A beautiful beginning.' },
  { id: 1444442, caption: "A smile I'll never forget." },
  { id: 1450082, caption: 'Every moment mattered.' },
  { id: 1488318, caption: 'Little memories, endless happiness.' },
  { id: 1024311, caption: 'You made life brighter.' },
  { id: 1467302, caption: 'The laughter still echoes.' },
  { id: 1494255, caption: 'So many unforgettable moments.' },
  { id: 1537194, caption: 'Closer than yesterday.' },
  { id: 1755385, caption: 'Almost there...' },
  { id: 1772123, caption: 'The best surprise is waiting.' },
];

export function getMemoryImages(): MemoryImage[] {
  return memoryPhotos.map((photo, i) => ({
    id: `memory-${i + 1}`,
    src: `https://images.pexels.com/photos/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=900`,
    alt: `Memory ${i + 1}`,
    caption: photo.caption,
  }));
}

export const imageManifest: Record<ImageId, ImageAsset> = {
  ...Object.fromEntries(getTeaserImages().map((img) => [img.id, { id: img.id, src: img.src, alt: img.alt }])),
  ...Object.fromEntries(getMemoryImages().map((img) => [img.id, { id: img.id, src: img.src, alt: img.alt }])),
};
