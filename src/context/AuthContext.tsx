import type { UserSignUp } from '@/models/auth.model';
import { post, get } from '@/services/httpService';
import * as authActions from '@/store/actions/auth/authSlice';
import type { RootState } from '@/store/store';
import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated) || false;

  const signUp = async (data: UserSignUp) => {
    try {
      dispatch(authActions.setLoading());

      const response: any = await post('/auth/signup', { ...data });
      const { email, firstName, lastName, userData, access_token }: any = response;

      if (response) {
        dispatch(authActions.authSuccess({ email, firstName, lastName, userData }));
        localStorage.setItem('access_token', access_token);
        navigate('/');
      }
    } catch (error: any) {
      dispatch(authActions.authFailure(error.message as string));
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      dispatch(authActions.setLoading());

      const response: any = await post('/auth/signin', { email, password });
      const { email: emailResponse, firstName, lastName, userData, access_token }: any = response;

      if (response) {
        dispatch(authActions.authSuccess({ email: emailResponse, firstName, lastName, userData }));
        localStorage.setItem('access_token', access_token);
        navigate('/');
      }
    } catch (error: any) {
      dispatch(authActions.authFailure(error.message as string));
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      dispatch(authActions.setLoading());
      const response: any = await get('/auth/signout');

      if (response) {
        dispatch(authActions.signOut());
        localStorage.removeItem('access_token');
        navigate('/signin');
      }
    } catch (error: any) {
      dispatch(authActions.authFailure(error.message as string));
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const handleAuthentication = (currentPath: string) => {
      if (isAuthenticated) {
        const targetPath = currentPath === '/signin' || currentPath === '/signup' ? '/notes' : currentPath;
        navigate(targetPath, { replace: true });
      } else if (currentPath !== '/signin' && currentPath !== '/signup') {
        navigate('/signin', { replace: true });
      }
    };

    const currentPath = window.location.pathname;
    const getAuthStatus = async () => {
      try {
        dispatch(authActions.setLoading());

        const response = await get('/auth/status');
        const { email, firstName, lastName, userData }: any = response;
        if (response) {
          dispatch(authActions.authSuccess({ email, firstName, lastName, userData }));
          handleAuthentication(currentPath);
        }
      } catch (error: any) {
        dispatch(authActions.authFailure(error.message as string));
        handleAuthentication(currentPath);
      }
    };

    getAuthStatus();
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, isAuthenticated } as any}>{children}</AuthContext.Provider>
  );
};
