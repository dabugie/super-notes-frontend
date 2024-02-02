import { Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { Dashboard } from './pages/Dashboard';
import { PageNotFound } from './pages/NotFoundPage';
import { ThemeProvider } from './providers/themeProvider';

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="supernotes-ui-theme">
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
