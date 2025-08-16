import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AppProvider, useApp } from './hooks/useApp';
import { theme } from './utils/theme';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import TutorDetailPage from './pages/TutorDetailPage';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const { state } = useApp();
  const [currentPage, setCurrentPage] = useState<'search' | 'detail' | 'profile'>('search');

  const handlePageChange = (page: string) => {
    setCurrentPage(page as 'search' | 'detail' | 'profile');
  };

  if (!state.isAuthenticated) {
    return <LoginPage />;
  }

  if (state.selectedTutor && currentPage !== 'profile') {
    return (
      <Box>
        <Navigation onPageChange={handlePageChange} currentPage="detail" />
        <TutorDetailPage />
      </Box>
    );
  }

  let pageNode: React.ReactElement;
  switch (currentPage) {
    case 'profile':
      pageNode = <ProfilePage />;
      break;
    case 'search':
    default:
      pageNode = <SearchPage />;
  }

  return (
    <Box>
      <Navigation onPageChange={handlePageChange} currentPage={currentPage} />
      {pageNode}
    </Box>
  );
}

function App() {
  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        '& ::-webkit-scrollbar': {
          width: '8px',
        },
        '& ::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '& ::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
          '&:hover': {
            background: '#555',
          },
        },
      }}>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </Box>
    </ThemeProvider>
  );
}

export default App;



