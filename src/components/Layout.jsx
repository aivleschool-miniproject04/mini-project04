import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';

export const Layout = ({ children, onNavigate }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f7f9fc' }}>
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box 
              onClick={() => onNavigate('list', null)} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <AutoStoriesIcon sx={{ mr: 1.5, fontSize: '2rem', color: '#ffc107' }} />
              <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '.05rem',
                  color: '#fff',
                  fontFamily: '"Outfit", "Inter", sans-serif'
                }}
              >
                작가의 산책
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  ml: 1.5, 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  px: 1, 
                  py: 0.25, 
                  borderRadius: 1,
                  color: '#e0e0e0',
                  fontWeight: 600
                }}
              >
                AI 도서관리
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => onNavigate('form', null)}
              sx={{
                bgcolor: '#ffc107',
                color: '#1e3c72',
                fontWeight: 700,
                boxShadow: '0 4px 10px rgba(255, 193, 7, 0.3)',
                '&:hover': {
                  bgcolor: '#ffb300',
                  boxShadow: '0 6px 15px rgba(255, 193, 7, 0.4)',
                },
                borderRadius: '8px',
                textTransform: 'none',
                px: 2.5
              }}
            >
              새 도서 등록
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Container>

      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: '#1e2d4a',
          color: '#8fa0bc',
          borderTop: '1px solid #2d3f61'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ fontWeight: 500 }}>
            {'© '}
            {new Date().getFullYear()} 작가의 산책 - AI 트랙 미니프로젝트 4차. All Rights Reserved.
          </Typography>
          <Typography variant="caption" align="center" display="block" sx={{ mt: 0.5, color: '#687b99' }}>
            Powered by React, Material UI, and OpenAI DALL-E
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
