import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import petReducer from '../features/pet/petSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pet: petReducer
  },
});
