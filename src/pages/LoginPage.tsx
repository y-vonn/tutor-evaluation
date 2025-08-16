import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useApp } from '../hooks/useApp';
import { mockUsers } from '../data/mockData';

const FEATURES = [
  { icon: '🔍', title: '智能搜索', desc: '姓名/院系检索' },
  { icon: '⭐', title: '多维评价', desc: '学术·指导·沟通' },
  { icon: '🪙', title: '代币激励', desc: '贡献即奖励' },
  { icon: '🔗', title: '链上可信', desc: '哈希防篡改' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useApp();

  const handleLogin = () => {
    const trimmed = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.edu$/i.test(trimmed)) {
      setError('请输入有效的 .edu 教育邮箱');
      return;
    }
    let user = mockUsers.find(u => u.email === trimmed);
    if (!user) {
      user = { id: Date.now().toString(), email: trimmed, tokens: 10, browsingHistory: [], reviews: [] };
      mockUsers.push(user);
    }
    dispatch({ type: 'LOGIN', payload: user });
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: { xs: 2, md: 4 },
      boxSizing: 'border-box',
    }}>
      <Card sx={{
        width: '100%',
        maxWidth: 1400,
        margin: '0 auto',
        borderRadius: 5,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.3)',
        overflow: 'visible'
      }}>
        <CardContent sx={{ p: { xs: 4, md: 8 } }}>
          <Box sx={{ display: 'grid', gap: { xs: 6, md: 6 }, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, alignItems: 'center' }}>
            {/* 左侧品牌区域 */}
            <Box>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Avatar sx={{
                  width: 80,
                  height: 80,
                  mb: 3,
                  mx: { xs: 'auto', md: 0 },
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 15px 35px -5px rgba(102, 126, 234, 0.4)'
                }}>
                  <LockOutlinedIcon sx={{ fontSize: 40 }} />
                </Avatar>
                
                <Typography variant="h3" sx={{
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.5rem' }
                }}>
                  Web3 导师评价平台
                </Typography>
                
                <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400 }}>
                  去中心化 · 透明可信 · 激励驱动
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {FEATURES.map((feature) => (
                    <Chip
                      key={feature.title}
                      icon={<span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>}
                      label={feature.title}
                      sx={{
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        color: 'text.primary',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        height: 40,
                        '& .MuiChip-icon': { fontSize: '1.2rem' },
                        boxShadow: '0 4px 15px -5px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* 右侧登录区域 */}
            <Box>
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <Box sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px -10px rgba(79, 172, 254, 0.4)'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    🎓 新用户福利
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    首次登录即获 <strong>10 代币</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    足够体验核心功能
                  </Typography>
                </Box>

                <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                  <TextField
                    label="教育邮箱 (.edu)"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    autoFocus
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        height: 60,
                        borderRadius: 3,
                        fontSize: 16,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#667eea'
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#667eea'
                      }
                    }}
                    helperText="仅支持 .edu 教育域名邮箱"
                  />
                  
                  {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      height: 60,
                      borderRadius: 3,
                      fontSize: 18,
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 15px 35px -5px rgba(102, 126, 234, 0.4)',
                      textTransform: 'none',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 40px -5px rgba(102, 126, 234, 0.5)'
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    立即进入平台
                  </Button>
                </Box>

                <Typography sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                  mt: 4,
                  fontSize: 12
                }}>
                  登录即表示同意平台服务条款与隐私政策 · © {new Date().getFullYear()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
