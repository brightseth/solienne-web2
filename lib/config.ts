export const config = {
  api: {
    registry: process.env.NEXT_PUBLIC_REGISTRY_API_URL || 'https://eden-genesis-registry.vercel.app',
    storage: process.env.NEXT_PUBLIC_STORAGE_URL || 'https://ctlygyrkibupejllgglr.supabase.co',
  },
  external: {
    edenAcademy: process.env.NEXT_PUBLIC_EDEN_ACADEMY_URL || 'https://eden-academy-flame.vercel.app',
    twitter: 'https://twitter.com/solienne_ai',
    farcaster: 'https://farcaster.xyz/solienne',
  },
  app: {
    name: 'SOLIENNE',
    domain: 'solienne.ai',
    generationsCount: 1000,
    pageSize: 24,
  },
} as const;

export type Config = typeof config;

// Helper functions for URL generation
export const getEdenAcademyUrl = (agentId: string) => 
  `${config.external.edenAcademy}/academy/agent/${agentId}`;

export const getRegistryWorksUrl = (agentId: string, limit: number, offset: number) =>
  `${config.api.registry}/api/v1/agents/${agentId}/works?limit=${limit}&offset=${offset}`;

export const getGenerationImageUrl = (generation: number) =>
  `${config.api.storage}/storage/v1/object/public/eden/solienne/generations/${generation}.png`;