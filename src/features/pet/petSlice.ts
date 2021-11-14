import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PetModel } from "../../models/pet";

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
      state.currentProgress += 1;
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
    load: (state, action: PayloadAction<PetModel>) => {
      state.lastTrigger = "incrementHappiness";
      state.happiness = action.payload.happiness;
      state.currentProgress = action.payload.currentProgress;
    },
  },
});

export const {
  incrementHappiness,
  decrementHappiness,
  incrementProgress,
  setHappiness,
  clearLastTrigger,
  load,
} = petSlice.actions;

export const selectPet = (state: RootState) => state.pet;

export default petSlice.reducer;
