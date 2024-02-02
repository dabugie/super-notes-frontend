import type { Note } from '@/models/note.model';
import { createSlice } from '@reduxjs/toolkit';

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  isLoading: false,
  error: null
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    unSetLoading(state) {
      state.isLoading = false;
    },

    notesSuccess(state, action) {
      state.notes = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    notesFailure(state, action) {
      state.notes = [];
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { setLoading, unSetLoading, notesSuccess, notesFailure } = notesSlice.actions;
export default notesSlice.reducer;
