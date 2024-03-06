import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './actions/notes/notesSlice';
import selectedNoteReducer from './actions/notes/selectedNoteSlice';
import authReducer from './actions/auth/authSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    selectedNote: selectedNoteReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
