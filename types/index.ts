export interface Work {
  id: string;
  title: string;
  imageUrl: string;
  fullImageUrl?: string;
  metadata?: WorkMetadata;
  createdAt?: string;
  generation?: number;
}

export interface WorkMetadata {
  prompt?: string;
  model?: string;
  parameters?: Record<string, unknown>;
  tags?: string[];
}

export interface Collection {
  name: string;
  description: string;
  range?: [number, number];
}

export type CollectionKey = 'all' | 'favorites' | 'velocity' | 'architecture' | 'emergence' | 'synthesis';