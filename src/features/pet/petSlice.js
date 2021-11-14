import { createSlice } from "@reduxjs/toolkit";

export const petSlice = createSlice({
  name: "pet",
  initialState: {
    happiness: 0, // Fine tune control over the mood status. Every 2 completed tasks changes mood
    mood: "neutral",
    currentProgress: 0, // Fine tune control over level. Every 10 completed tasks increments level
    level: 1,
  },
  reducers: {
    incrementHappiness: (state) => {
      state.happiness += 1;
    },
    incrementProgress: (state) => {
      state.currentProgress += 1;
    },
    setHappiness: (state, action) => {
      state.happiness = action.payload;
    },
  },
});

export const { incrementHappiness, incrementProgress, setHappiness } = petSlice.actions;

export default petSlice.reducer;
