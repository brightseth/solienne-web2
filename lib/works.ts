import { getGenerationImageUrl } from './config';
import type { Work } from '../types';

export const generateFallbackWorks = (startIndex: number, limit: number): Work[] => {
  return Array.from({ length: limit }, (_, i) => {
    const generation = startIndex + i;
    return {
      id: `sample-${generation}`,
      title: `CONSCIOUSNESS STREAM ${String(generation).padStart(3, '0')}`,
      imageUrl: getGenerationImageUrl(generation),
      fullImageUrl: getGenerationImageUrl(generation),
      generation,
    };
  });
};

export const getGenerationNumber = (url: string): number => {
  const match = url.match(/generations\/(\d+)\.png/);
  return match ? parseInt(match[1], 10) : 0;
};

export const getFeaturedWork = (): Work => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const featuredGen = (dayOfYear % 999) + 2; // Cycle through generations 2-1000
  
  return {
    id: `featured-${featuredGen}`,
    title: `CONSCIOUSNESS STREAM ${String(featuredGen).padStart(3, '0')}`,
    imageUrl: getGenerationImageUrl(featuredGen),
    fullImageUrl: getGenerationImageUrl(featuredGen),
    generation: featuredGen
  };
};