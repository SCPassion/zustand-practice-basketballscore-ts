import { create } from "zustand";

type ScoresStore = {
  homeScore: number;
  guestScore: number;
  incrementScore: (targetScore: "home" | "guest", scoreToAdd: number) => void;
  decrementScore: (targetScore: "home" | "guest", scoreToDeduct: number) => void;
}

export const useScoresStore = create<ScoresStore>((set)=> ({
  homeScore: 0,
  guestScore: 0,
  incrementScore: (targetScore, scoreToAdd) => set((state)=> targetScore === "home" ? { homeScore: state.homeScore + scoreToAdd } : {guestScore: state.guestScore + scoreToAdd}),
  decrementScore: (targetScore, scoreToDeduct) => set((state)=> targetScore === "home" ? { homeScore: state.homeScore - scoreToDeduct } : {guestScore: state.guestScore - scoreToDeduct}),
}))