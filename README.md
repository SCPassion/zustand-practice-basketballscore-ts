## Zustand Store Guide

### 1. How to Create a Zustand Store
A Zustand store is created using the `create` function from the `zustand` library. Here's an example from this project:

```typescript
import { create } from "zustand";

type ScoresStore = {
  homeScore: number;
  guestScore: number;
  incrementScore: (targetScore: "home" | "guest", scoreToAdd: number) => void;
  decrementScore: (targetScore: "home" | "guest", scoreToDeduct: number) => void;
};

export const useScoresStore = create<ScoresStore>((set) => ({
  homeScore: 0,
  guestScore: 0,
  incrementScore: (targetScore, scoreToAdd) =>
    set((state) =>
      targetScore === "home"
        ? { homeScore: state.homeScore + scoreToAdd }
        : { guestScore: state.guestScore + scoreToAdd }
    ),
  decrementScore: (targetScore, scoreToDeduct) =>
    set((state) =>
      targetScore === "home"
        ? { homeScore: state.homeScore - scoreToDeduct }
        : { guestScore: state.guestScore - scoreToDeduct }
    ),
}));
```

### 2. When the Zustand Store is Created
The store is created the first time the `useScoresStore` hook is imported and used in a component. Specifically, when the following import statement is executed:

```typescript
import { useScoresStore } from "./store/store";
```

This triggers the creation of the store.

### 3. How to Define the Type of a Zustand Store
The type of the store is defined using TypeScript. In this project, the `ScoresStore` type is defined as follows:

```typescript
type ScoresStore = {
  homeScore: number;
  guestScore: number;
  incrementScore: (targetScore: "home" | "guest", scoreToAdd: number) => void;
  decrementScore: (targetScore: "home" | "guest", scoreToDeduct: number) => void;
};
```

This type is then passed as a generic to the `create` function to ensure type safety.

### 4. How to Use a Selector to Get the Zustand Store from a Component
Selectors allow you to extract specific parts of the store state. For example, in a component, you can use the `useScoresStore` hook with a selector:

```typescript
import { useScoresStore } from "./store/store";

const homeScore = useScoresStore((state) => state.homeScore);
const incrementHomeScore = useScoresStore((state) => state.incrementScore);
```

This approach ensures that only the selected parts of the state are re-rendered when they change.

### 5. How to Get Everything in the Store
If you want to access the entire store instead of using a selector, you can do so by calling the `useScoresStore` hook without any arguments. For example:

```typescript
import { useScoresStore } from "./store/store";

const store = useScoresStore();

console.log(store.homeScore); // Access homeScore
console.log(store.guestScore); // Access guestScore
store.incrementScore("home", 1); // Increment homeScore by 1
store.decrementScore("guest", 1); // Decrement guestScore by 1
```

This approach gives you access to all the state and actions defined in the store.

### 6. Setting State Directly in the Store
In Zustand, you can set a variable directly in the `set()` function without using a callback. For example, instead of using a callback to update the state, you can directly assign a value:

```typescript
export const useScoresStore = create<ScoresStore>((set) => ({
  homeScore: 0,
  guestScore: 0,
  win: false,
  setWinning: () => set({ win: true }), // Directly setting the state
}));
```

This approach is simpler when you don't need to reference the previous state. However, if your update depends on the current state, you should use a callback function in `set()` to ensure the state is updated correctly.