import type { Note } from '@/models/note.model';
import * as notesActions from '@/store/actions/notesSlice';
import type { Dispatch } from 'redux';
import { get } from './httpService';

export const getNotes = async (dispatch: Dispatch) => {
  try {
    const response: Note[] | undefined = await get('/notes');

    console.log('response', response);
    

    if (response) {
      dispatch(notesActions.notesSuccess(response));
    }
  } catch (error) {
    console.error('Error en la solicitud o datos indefinidos.');
  }
};
