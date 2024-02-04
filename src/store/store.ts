import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './actions/notes/notesSlice';
import selectedNoteReducer from './actions/notes/selectedNoteSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    selectedNote: selectedNoteReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
