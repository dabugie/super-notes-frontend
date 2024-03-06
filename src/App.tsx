import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './layouts/Layout';
import { PageNotFound } from './pages/NotFoundPage';
import { Signin, Signup } from './pages/auth';
import { NotesPage } from './pages/notes/NotesPage';
import { ThemeProvider } from './providers/themeProvider';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as notesActions from '@/store/actions/notes/notesSlice';
import { get } from './services/httpService';
import type { Note } from './models/note.model';
import type { RootState } from './store/store';

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const notes: Note[] = useSelector((state: RootState) => state.notes.notes) || [];

  // useEffect(() => {
  //   const getNotes = async () => {
  //     try {
  //       dispatch(notesActions.setLoading());

  //       const response: any = await get('/notes');
  //       const notes: Note[] = response;

  //       if (notes) {
  //         dispatch(notesActions.notesSuccess(notes));
  //       }
  //     } catch (error: any) {
  //       console.error('Error getting notes:', error);
  //       dispatch(notesActions.notesFailed(error.message as string));
  //     }
  //   };

  //   if (!notes.length) {
  //     getNotes();
  //   }
  // }, [dispatch, notes.length]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="supernotes-ui-theme">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<LayoutWrapper />}>
              <Route path="/" element={<NotesPage />} />
              <Route path="/:noteId" element={<NotesPage />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
