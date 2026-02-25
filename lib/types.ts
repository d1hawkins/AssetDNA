export interface User {
  id: string;
  name: string;
  email?: string;
  walletAddress?: string;
  role: "creator" | "agency";
  avatarUrl?: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  parentAssetId: string;
  modelUrl: string;
  thumbnailUrl: string;
  tokenId: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  hash: string;
  tokenId: string;
  modelUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  ownerId: string;
  wardrobeItems: WardrobeItem[];
}

export interface AgencyTalent {
  id: string;
  name: string;
  avatarUrl: string;
  assetCount: number;
  status: "active" | "pending";
}

export interface ActivityItem {
  id: string;
  type: "upload" | "wardrobe" | "licence" | "verification";
  description: string;
  assetId?: string;
  timestamp: string;
}
