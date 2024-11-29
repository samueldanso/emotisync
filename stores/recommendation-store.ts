import { create } from "zustand";
import type { Recommendation } from "@/lib/types/recommendation";

interface RecommendationState {
  recommendations: Recommendation[];
  isLoading: boolean;
  activeCategory: string | null;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setLoading: (isLoading: boolean) => void;
  setActiveCategory: (category: string | null) => void;
  updateRecommendationStatus: (
    id: string,
    status: Recommendation["status"]
  ) => void;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  recommendations: [],
  isLoading: false,
  activeCategory: null,
  setRecommendations: (recommendations) => set({ recommendations }),
  setLoading: (isLoading) => set({ isLoading }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  updateRecommendationStatus: (id, status) =>
    set((state) => ({
      recommendations: state.recommendations.map((rec) =>
        rec.id === id ? { ...rec, status } : rec
      ),
    })),
}));
