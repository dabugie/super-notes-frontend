import type { Note } from '@/models/note.model';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SelectedNoteState {
  note: Note | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SelectedNoteState = {
  note: null,
  isLoading: false,
  error: null
};

const selectedNoteSlice = createSlice({
  name: 'selectedNote',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
      state.error = null;
    },

    unSetLoading(state) {
      state.isLoading = false;
    },

    selectedNoteSuccess(state: SelectedNoteState, action: PayloadAction<Note>) {
      state.note = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    selectedNoteFailed(state: SelectedNoteState, action: PayloadAction<string>) {
      state.note = null;
      state.isLoading = false;
      state.error = action.payload;
    },

    unSetSelectedNote: (state: SelectedNoteState) => {
      state.note = null;
      state.isLoading = false;
      state.error = null;
    }
  }
});

export const { setLoading, unSetLoading, selectedNoteSuccess, selectedNoteFailed, unSetSelectedNote } =
  selectedNoteSlice.actions;
export default selectedNoteSlice.reducer;
