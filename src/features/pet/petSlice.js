import { createSlice } from "@reduxjs/toolkit";

export const petSlice = createSlice({
  name: "pet",
  initialState: {
    happiness: 0, // Fine tune control over the mood status. Every 2 completed tasks changes mood
    mood: "neutral",
    currentProgress: 0, // Fine tune control over level. Every 10 completed tasks increments level
    level: 1,
    lastTrigger: null, // The last trigger for the pet to respond to
  },
  reducers: {
    incrementHappiness: (state) => {
      state.happiness += 1;
      state.lastTrigger = "incrementHappiness";
    },
    decrementHappiness: (state) => {
      state.happiness -= 1;
      state.happiness = Math.max(state.happiness, 0);
      state.lastTrigger = "decrementHappiness";
    },
    incrementProgress: (state) => {
      state.currentProgress += 1;
      state.lastTrigger = "incrementProgress";
    },
    setHappiness: (state, action) => {
      state.happiness = action.payload;
      state.lastTrigger = "setHappiness";
    },
    clearLastTrigger: (state) => {
      state.lastTrigger = null;
    },
  },
});

export const { incrementHappiness, decrementHappiness, incrementProgress, setHappiness, clearLastTrigger } =
  petSlice.actions;

export default petSlice.reducer;
