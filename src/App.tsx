import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './layouts/Layout';
import { PageNotFound } from './pages/NotFoundPage';
import { Signin, Signup } from './pages/auth';
import { NotesPage } from './pages/notes/NotesPage';
import { ThemeProvider } from './providers/themeProvider';

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => {
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
