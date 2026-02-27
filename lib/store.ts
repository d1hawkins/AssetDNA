import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Asset, AgencyTalent, ActivityItem } from "./types";
import { mockAssets, mockTalent, mockActivity } from "./mock-data";

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  currentRole: "creator" | "agency";
  assets: Asset[];
  talent: AgencyTalent[];
  activity: ActivityItem[];
  sidebarOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: "creator" | "agency") => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  addWardrobeItem: (assetId: string, item: Asset["wardrobeItems"][0]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      currentRole: "creator",
      assets: mockAssets,
      talent: mockTalent,
      activity: mockActivity,
      sidebarOpen: false,
      login: (user) => set({ user, isAuthenticated: true, currentRole: user.role }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setRole: (role) => set({ currentRole: role }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      addAsset: (asset) =>
        set((state) => ({
          assets: [asset, ...state.assets],
          activity: [{ id: `act-${Date.now()}`, type: "upload", description: `${asset.name} uploaded and verified`, assetId: asset.id, timestamp: new Date().toISOString() }, ...state.activity],
        })),
      updateAsset: (id, updates) => set((state) => ({ assets: state.assets.map((a) => (a.id === id ? { ...a, ...updates } : a)) })),
      addWardrobeItem: (assetId, item) =>
        set((state) => ({
          assets: state.assets.map((a) => (a.id === assetId ? { ...a, wardrobeItems: [...a.wardrobeItems, item] } : a)),
          activity: [{ id: `act-${Date.now()}`, type: "wardrobe", description: `${item.name} added to wardrobe`, assetId, timestamp: new Date().toISOString() }, ...state.activity],
        })),
    }),
    { name: "assetdna-storage", partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated, currentRole: state.currentRole, assets: state.assets, activity: state.activity }) }
  )
);
