import type { Note, NoteDto } from '@/models/note.model';
import * as notesActions from '@/store/actions/notes/notesSlice';
import type { Dispatch } from 'redux';
import { get, post, put, remove } from './httpService';
import * as selectedNoteActions from '@/store/actions/notes/selectedNoteSlice';

export const getNotes = async (dispatch: Dispatch) => {
  try {
    const response: Note[] | undefined = await get('/notes');

    if (response) {
      dispatch(notesActions.notesSuccess(response));
    }
  } catch (error) {
    handleApiError(dispatch, error);
  }
};

export const createNote = async (dispatch: Dispatch, note: NoteDto) => {
  try {
    dispatch(notesActions.setLoading());

    const response: Note | undefined = await post('/notes', note);

    if (response) {
      dispatch(notesActions.setNewNote(response));
    }
  } catch (error) {
    handleApiError(dispatch, error);
  }
};

export const getNoteById = async (dispatch: Dispatch, id: string) => {
  try {
    dispatch(selectedNoteActions.unSetSelectedNote());

    dispatch(selectedNoteActions.setLoading());

    const response: Note | undefined = await get(`/notes/${id}`);

    if (response) {
      dispatch(selectedNoteActions.selectedNoteSuccess(response));
      return true;
    }

    return false;
  } catch (error) {
    dispatch(selectedNoteActions.selectedNoteFailed(error as string));
  }
};

export const updateNote = async (dispatch: Dispatch, noteId: string, note: NoteDto) => {
  try {
    dispatch(selectedNoteActions.setLoading());

    const response: Note | undefined = await put(`/notes/${noteId}`, note);

    if (response) {
      dispatch(notesActions.updateNote(response));
    }
  } catch (error) {
    dispatch(notesActions.notesFailure(error as string));
  }
};

export const deleteNote = async (dispatch: Dispatch, id: string) => {
  try {
    dispatch(notesActions.setLoading());

    await remove(`/notes/${id}`);

    dispatch(notesActions.removeNote(id));
  } catch (error) {
    dispatch(notesActions.notesFailure(error as string));
  }
};

const handleApiError = (dispatch: Dispatch, error: any) => {
  dispatch(notesActions.notesFailure(error as string));
};
