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
    },

    unSetNotes(state) {
      state.notes = [];
      state.isLoading = false;
      state.error = null;
    },

    setNewNote(state, action) {
      state.notes.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },

    updateNote(state, action) {
      const noteIndex = state.notes.findIndex((note) => note.id === action.payload.id);

      if (noteIndex !== -1) {
        state.notes[noteIndex] = action.payload;
      }

      state.isLoading = false;
      state.error = null;
    },

    removeNote(state, action) {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { setLoading, unSetLoading, notesSuccess, notesFailure, setNewNote, updateNote, removeNote, unSetNotes } =
  notesSlice.actions;
export default notesSlice.reducer;
