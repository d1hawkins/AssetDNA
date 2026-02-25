import { Asset, User, AgencyTalent, ActivityItem } from "./types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "creator",
    avatarUrl: "/avatars/alex.png",
  },
  {
    id: "agency-1",
    name: "Digital Talent Agency",
    email: "admin@digitaltalent.com",
    role: "agency",
    avatarUrl: "/avatars/agency.png",
  },
];

export const mockAssets: Asset[] = [
  {
    id: "asset-1",
    name: "Nova",
    description: "Futuristic android character with customizable armor plating",
    hash: "a3f2b8c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    tokenId: "1001",
    modelUrl: "/models/nova.glb",
    thumbnailUrl: "/thumbnails/nova.png",
    createdAt: "2025-05-20T10:30:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-1-1",
        name: "Combat Jacket",
        parentAssetId: "asset-1",
        modelUrl: "/models/jacket.glb",
        thumbnailUrl: "/thumbnails/jacket.png",
        tokenId: "1001-1",
        createdAt: "2025-05-21T14:00:00Z",
      },
      {
        id: "ward-1-2",
        name: "Plasma Boots",
        parentAssetId: "asset-1",
        modelUrl: "/models/boots.glb",
        thumbnailUrl: "/thumbnails/boots.png",
        tokenId: "1001-2",
        createdAt: "2025-05-22T09:15:00Z",
      },
      {
        id: "ward-1-3",
        name: "Holo Visor",
        parentAssetId: "asset-1",
        modelUrl: "/models/visor.glb",
        thumbnailUrl: "/thumbnails/visor.png",
        tokenId: "1001-3",
        createdAt: "2025-05-23T16:45:00Z",
      },
      {
        id: "ward-1-4",
        name: "Energy Sword",
        parentAssetId: "asset-1",
        modelUrl: "/models/sword.glb",
        thumbnailUrl: "/thumbnails/sword.png",
        tokenId: "1001-4",
        createdAt: "2025-05-24T11:30:00Z",
      },
    ],
  },
  {
    id: "asset-2",
    name: "Zephyr",
    description: "Wind-themed elemental character with flowing cloth dynamics",
    hash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    tokenId: "1002",
    modelUrl: "/models/zephyr.glb",
    thumbnailUrl: "/thumbnails/zephyr.png",
    createdAt: "2025-05-18T08:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-2-1",
        name: "Storm Cloak",
        parentAssetId: "asset-2",
        modelUrl: "/models/cloak.glb",
        thumbnailUrl: "/thumbnails/cloak.png",
        tokenId: "1002-1",
        createdAt: "2025-05-19T10:00:00Z",
      },
      {
        id: "ward-2-2",
        name: "Wind Staff",
        parentAssetId: "asset-2",
        modelUrl: "/models/staff.glb",
        thumbnailUrl: "/thumbnails/staff.png",
        tokenId: "1002-2",
        createdAt: "2025-05-19T14:30:00Z",
      },
    ],
  },
  {
    id: "asset-3",
    name: "Atlas",
    description: "Heavy-armored guardian with stone-textured skin",
    hash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    tokenId: "1003",
    modelUrl: "/models/atlas.glb",
    thumbnailUrl: "/thumbnails/atlas.png",
    createdAt: "2025-05-15T12:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-3-1",
        name: "Titan Shield",
        parentAssetId: "asset-3",
        modelUrl: "/models/shield.glb",
        thumbnailUrl: "/thumbnails/shield.png",
        tokenId: "1003-1",
        createdAt: "2025-05-16T09:00:00Z",
      },
      {
        id: "ward-3-2",
        name: "Stone Gauntlets",
        parentAssetId: "asset-3",
        modelUrl: "/models/gauntlets.glb",
        thumbnailUrl: "/thumbnails/gauntlets.png",
        tokenId: "1003-2",
        createdAt: "2025-05-16T11:00:00Z",
      },
      {
        id: "ward-3-3",
        name: "Earth Helm",
        parentAssetId: "asset-3",
        modelUrl: "/models/helm.glb",
        thumbnailUrl: "/thumbnails/helm.png",
        tokenId: "1003-3",
        createdAt: "2025-05-17T08:00:00Z",
      },
      {
        id: "ward-3-4",
        name: "Boulder Hammer",
        parentAssetId: "asset-3",
        modelUrl: "/models/hammer.glb",
        thumbnailUrl: "/thumbnails/hammer.png",
        tokenId: "1003-4",
        createdAt: "2025-05-17T14:00:00Z",
      },
      {
        id: "ward-3-5",
        name: "Granite Pauldrons",
        parentAssetId: "asset-3",
        modelUrl: "/models/pauldrons.glb",
        thumbnailUrl: "/thumbnails/pauldrons.png",
        tokenId: "1003-5",
        createdAt: "2025-05-17T16:00:00Z",
      },
      {
        id: "ward-3-6",
        name: "Quake Boots",
        parentAssetId: "asset-3",
        modelUrl: "/models/quakeboots.glb",
        thumbnailUrl: "/thumbnails/quakeboots.png",
        tokenId: "1003-6",
        createdAt: "2025-05-18T10:00:00Z",
      },
      {
        id: "ward-3-7",
        name: "Obsidian Cape",
        parentAssetId: "asset-3",
        modelUrl: "/models/cape.glb",
        thumbnailUrl: "/thumbnails/cape.png",
        tokenId: "1003-7",
        createdAt: "2025-05-18T15:00:00Z",
      },
    ],
  },
  {
    id: "asset-4",
    name: "Luna",
    description: "Ethereal moon priestess with luminescent features",
    hash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    tokenId: "1004",
    modelUrl: "/models/luna.glb",
    thumbnailUrl: "/thumbnails/luna.png",
    createdAt: "2025-05-10T18:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [],
  },
  {
    id: "asset-5",
    name: "Orion",
    description: "Star hunter with constellation-mapped armor",
    hash: "e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    tokenId: "1005",
    modelUrl: "/models/orion.glb",
    thumbnailUrl: "/thumbnails/orion.png",
    createdAt: "2025-05-08T14:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-5-1",
        name: "Celestial Bow",
        parentAssetId: "asset-5",
        modelUrl: "/models/bow.glb",
        thumbnailUrl: "/thumbnails/bow.png",
        tokenId: "1005-1",
        createdAt: "2025-05-09T10:00:00Z",
      },
      {
        id: "ward-5-2",
        name: "Star Quiver",
        parentAssetId: "asset-5",
        modelUrl: "/models/quiver.glb",
        thumbnailUrl: "/thumbnails/quiver.png",
        tokenId: "1005-2",
        createdAt: "2025-05-09T12:00:00Z",
      },
      {
        id: "ward-5-3",
        name: "Nebula Cloak",
        parentAssetId: "asset-5",
        modelUrl: "/models/nebulacloak.glb",
        thumbnailUrl: "/thumbnails/nebulacloak.png",
        tokenId: "1005-3",
        createdAt: "2025-05-10T09:00:00Z",
      },
    ],
  },
];

export const mockTalent: AgencyTalent[] = [
  { id: "talent-1", name: "Alex M.", avatarUrl: "/avatars/talent1.png", assetCount: 6, status: "active" },
  { id: "talent-2", name: "Jordan K.", avatarUrl: "/avatars/talent2.png", assetCount: 4, status: "active" },
  { id: "talent-3", name: "Sam Chen", avatarUrl: "/avatars/talent3.png", assetCount: 8, status: "pending" },
  { id: "talent-4", name: "Riley Park", avatarUrl: "/avatars/talent4.png", assetCount: 3, status: "active" },
];

export const mockActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "wardrobe",
    description: "Nova wardrobe updated - 2 new items",
    assetId: "asset-1",
    timestamp: "2025-05-24T14:30:00Z",
  },
  {
    id: "act-2",
    type: "verification",
    description: "Zephyr DNA registered",
    assetId: "asset-2",
    timestamp: "2025-05-23T10:00:00Z",
  },
  {
    id: "act-3",
    type: "licence",
    description: "Atlas licensed to Studio X",
    assetId: "asset-3",
    timestamp: "2025-05-21T16:00:00Z",
  },
  {
    id: "act-4",
    type: "upload",
    description: "Luna uploaded and verified",
    assetId: "asset-4",
    timestamp: "2025-05-10T18:30:00Z",
  },
];

export function generateMockHash(): string {
  const chars = "0123456789abcdef";
  let hash = "";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function generateMockTokenId(): string {
  return String(1000 + Math.floor(Math.random() * 9000));
}

export function generateMockTxHash(): string {
  return "0x" + generateMockHash().slice(0, 40);
}
