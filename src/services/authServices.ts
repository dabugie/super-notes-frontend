import type { UserSignUp } from '@/models/auth.model';
import { post } from './httpService';
import * as authActions from '@/store/actions/auth/authSlice';
import type { Dispatch } from 'redux';

export const signUp = async (dispatch: Dispatch, data: UserSignUp) => {
  try {
    dispatch(authActions.setLoading());

    const response: any = await post('/auth/signup', { ...data });

    if (response) {
      dispatch(authActions.authSuccess(response));
    }
  } catch (error) {
    handleApiError(dispatch, error);
  }
};

const handleApiError = (dispatch: Dispatch, error: any) => {
  dispatch(authActions.authFailure(error as string));
};
