import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { PageNotFound } from './pages/NotFoundPage';
import { NotesPage } from './pages/notes/NotesPage';
import { ThemeProvider } from './providers/themeProvider';
import { getNotes } from './services/notesServices';

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getNotes(dispatch);
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="supernotes-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<NotesPage />} />
            <Route path="/:noteId" element={<NotesPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
