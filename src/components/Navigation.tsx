import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import { useApp } from '../hooks/useApp';

interface NavigationProps {
  onPageChange: (page: string) => void;
  currentPage?: 'search' | 'profile' | 'detail';
}

export default function Navigation({ onPageChange, currentPage }: NavigationProps) {
  const { state, dispatch } = useApp();
  
  const tokenCount = state.user?.tokens || 0;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(115deg, #4f46e5 0%, #6366f1 30%, #8b5cf6 60%, #d946ef 100%)',
        boxShadow: '0 4px 18px -6px rgba(99,102,241,0.55)',
        borderBottom: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(6px)',
        '& .MuiToolbar-root': { minHeight: { xs: 56, sm: 64 } },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg,#ffffff 0%,#f1f5f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Web3 导师评价平台
        </Typography>
        {state.isAuthenticated && (
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Chip
              label={tokenCount + ' 代币'}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(6px)',
                fontWeight: 600,
                height: 34,
                px: 0.5
              }}
            />
            <Button
              onClick={() => onPageChange('search')}
              aria-current={currentPage === 'search' ? 'page' : undefined}
              sx={{
                position: 'relative',
                fontWeight: 600,
                letterSpacing: '.5px',
                color: 'white',
                px: 2.5,
                py: 1,
                borderRadius: 3,
                textTransform: 'none',
                transition: 'all .35s cubic-bezier(.4,0,.2,1)',
                '&:focus,&:focus-visible': { outline: 'none' },
                '&:hover': {
                  background: 'rgba(255,255,255,0.18)',
                  boxShadow: '0 4px 14px -4px rgba(0,0,0,.35)'
                },
                ...(currentPage === 'search' && {
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)',
                  boxShadow: '0 4px 14px -6px rgba(0,0,0,.28), 0 2px 6px -2px rgba(255,255,255,0.25)',
                  border: 'none',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 14,
                    right: 14,
                    bottom: 6,
                    height: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg,#fff,#e0e7ff)'
                  }
                })
              }}
            >
              搜索导师
            </Button>
            <Button
              onClick={() => onPageChange('profile')}
              aria-current={currentPage === 'profile' ? 'page' : undefined}
              sx={{
                position: 'relative',
                fontWeight: 600,
                letterSpacing: '.5px',
                color: 'white',
                px: 2.5,
                py: 1,
                borderRadius: 3,
                textTransform: 'none',
                transition: 'all .35s cubic-bezier(.4,0,.2,1)',
                '&:focus,&:focus-visible': { outline: 'none' },
                '&:hover': {
                  background: 'rgba(255,255,255,0.18)',
                  boxShadow: '0 4px 14px -4px rgba(0,0,0,.35)'
                },
                ...(currentPage === 'profile' && {
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 100%)',
                  boxShadow: '0 4px 14px -6px rgba(0,0,0,.28), 0 2px 6px -2px rgba(255,255,255,0.25)',
                  border: 'none',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 14,
                    right: 14,
                    bottom: 6,
                    height: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg,#fff,#e0e7ff)'
                  }
                })
              }}
            >
              个人中心
            </Button>
            <Button
              onClick={() => dispatch({ type: 'LOGOUT' })}
              sx={{
                fontWeight: 500,
                color: 'white',
                textTransform: 'none',
                px: 2.5,
                py: 1,
                borderRadius: 3,
                '&:focus,&:focus-visible': { outline: 'none' },
                '&:hover': { background: 'rgba(255,255,255,0.18)' }
              }}
            >
              登出
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
