import  { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  InputAdornment,
  Fade,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  School as SchoolIcon,
  AccountBalance as DepartmentIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { useApp } from '../hooks/useApp';
import type { Tutor } from '../types';

export default function SearchPage() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const theme = useTheme();
  const user = state.user;
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTutorName, setNewTutorName] = useState('');
  const [newTutorSchool, setNewTutorSchool] = useState('');
  const [newTutorDepartment, setNewTutorDepartment] = useState('');
  const [error, setError] = useState('');

  const allTutors = state.tutors || [];

  const filteredTutors = allTutors.filter(tutor => {
    return (
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      tutor.school.toLowerCase().includes(schoolFilter.toLowerCase()) &&
      tutor.department.toLowerCase().includes(departmentFilter.toLowerCase())
    );
  });

  const handleViewDetails = (tutor: Tutor) => {
    dispatch({ type: 'SET_SELECTED_TUTOR', payload: tutor });
    dispatch({ type: 'ADD_TO_HISTORY', payload: tutor.id });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return '#4caf50';
    if (rating >= 4.0) return '#2196f3';
    if (rating >= 3.5) return '#ff9800';
    return '#f44336';
  };

  const getGradientBackground = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    ];
    return gradients[index % gradients.length];
  };

  const handleAddTutor = () => {
    setError('');
    if (!user) {
      setError('请先登录');
      return;
    }
    if (user.tokens < 2) {
      setError('代币不足（需要 2 个）');
      return;
    }
    if (!newTutorName.trim() || !newTutorSchool.trim() || !newTutorDepartment.trim()) {
      setError('请完整填写所有字段');
      return;
    }
    // 生成自增 ID
    const maxId = state.tutors.reduce((max, t) => {
      const num = parseInt(t.id, 10);
      return isNaN(num) ? max : Math.max(max, num);
    }, 0);
    const newId = (maxId + 1).toString();
    const newTutor: Tutor = {
      id: newId,
      name: newTutorName.trim(),
      school: newTutorSchool.trim(),
      department: newTutorDepartment.trim(),
      overallRating: 0,
      academicRating: 0,
      personalityRating: 0,
      internshipRating: 0,
      reviewCount: 0,
      reviews: [],
    };
    // 先扣代币，再添加导师
    dispatch({ type: 'UPDATE_USER_TOKENS', payload: user.tokens - 2 });
    dispatch({ type: 'ADD_TUTOR', payload: newTutor });
    // 重置表单并尝试把搜索词设为新导师名字以便显示
    setSearchTerm(newTutor.name);
    setShowAddForm(false);
    setNewTutorName('');
    setNewTutorSchool('');
    setNewTutorDepartment('');
  };

  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 64px)',
      width: '100%',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecf5 100%)',
      padding: { xs: '16px 16px 48px', md: '32px 40px 64px' },
      boxSizing: 'border-box'
    }}>
      <Box sx={{ width: '100%' }}>
        {/* 标题区域 */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2, 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 10px rgba(102, 126, 234, 0.3)',
              }}
            >
              🔍 智能导师搜索
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                opacity: 0.8
              }}
            >
              发现最适合您的学术导师
            </Typography>
          </Box>
        </Fade>

        {/* 搜索过滤器 */}
        <Fade in timeout={1000}>
          <Card sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SearchIcon /> 搜索筛选
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3 
            }}>
              <TextField
                fullWidth
                label="导师姓名"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="学校"
                value={schoolFilter}
                onChange={(e) => setSchoolFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="院系"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DepartmentIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ 
              mt: 3, 
              p: 2, 
              background: alpha(theme.palette.primary.main, 0.08),
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <StarIcon sx={{ color: 'primary.main' }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                找到 {filteredTutors.length} 位优秀导师
              </Typography>
            </Box>
          </Card>
        </Fade>

        {/* 导师卡片网格 */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)'
          },
          gap: { xs: 2.5, md: 3 },
          mb: 4,
          width: '100%'
        }}>
          {filteredTutors.map((tutor, index) => (
            <Fade in timeout={1200 + index * 100} key={tutor.id}>
              <Card sx={{
                height: '100%',
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 15px 40px -10px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': { 
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.2)',
                }
              }}>
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* 导师头像和基本信息 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                      mr: 2, 
                      width: 56, 
                      height: 56,
                      background: getGradientBackground(index),
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.3)',
                    }}>
                      {tutor.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {tutor.name}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: 'text.secondary',
                        background: alpha(theme.palette.primary.main, 0.1),
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 500
                      }}>
                        ID: {tutor.id}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 学校和院系信息 */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{ 
                      mb: 1, 
                      fontWeight: 600,
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <SchoolIcon fontSize="small" />
                      {tutor.school}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <DepartmentIcon fontSize="small" />
                      {tutor.department}
                    </Typography>
                  </Box>

                  {/* 综合评分 */}
                  <Box sx={{ 
                    mb: 3, 
                    p: 2, 
                    background: alpha(getRatingColor(tutor.overallRating), 0.1),
                    borderRadius: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 800,
                      color: getRatingColor(tutor.overallRating),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1
                    }}>
                      <StarIcon /> {tutor.overallRating.toFixed(1)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      综合评分
                    </Typography>
                  </Box>

                  {/* 详细评分 */}
                  <Box sx={{ mb: 3, flex: 1 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip 
                        icon={<TrendingUpIcon />}
                        label={`学术 ${tutor.academicRating.toFixed(1)}`}
                        size="small"
                        sx={{
                          background: alpha('#4caf50', 0.1),
                          color: '#4caf50',
                          fontWeight: 600,
                          '& .MuiChip-icon': { color: '#4caf50' }
                        }}
                      />
                      <Chip 
                        icon={<PsychologyIcon />}
                        label={`性格 ${tutor.personalityRating.toFixed(1)}`}
                        size="small"
                        sx={{
                          background: alpha('#2196f3', 0.1),
                          color: '#2196f3',
                          fontWeight: 600,
                          '& .MuiChip-icon': { color: '#2196f3' }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        label={`实习 ${tutor.internshipRating.toFixed(1)}`}
                        size="small"
                        sx={{
                          background: alpha('#ff9800', 0.1),
                          color: '#ff9800',
                          fontWeight: 600,
                        }}
                      />
                      <Chip 
                        label={`${tutor.reviewCount} 人评价`}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  </Box>

                  {/* 操作按钮 */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleViewDetails(tutor)}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 700,
                      background: getGradientBackground(index),
                      boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    查看详情 →
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>

        {/* 无结果提示 */}
        {filteredTutors.length === 0 && (
          <Fade in timeout={800}>
            <Card sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.15)',
            }}>
              {!showAddForm && (
                <>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    😔 未找到匹配的导师
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                    可以尝试调整搜索条件，或者添加一个新导师（消耗 2 个代币）
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setShowAddForm(true)}
                    disabled={!user || (user && user.tokens < 2)}
                    sx={{
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 25px -8px rgba(0, 0, 0, 0.3)',
                      '&:hover': { boxShadow: '0 12px 35px -8px rgba(0, 0, 0, 0.4)' }
                    }}
                  >
                    添加导师
                  </Button>
                  {(!user || (user && user.tokens < 2)) && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'error.main' }}>
                      {user ? '代币不足，无法添加' : '未登录无法添加'}
                    </Typography>
                  )}
                </>
              )}
              {showAddForm && (
                <Box sx={{ maxWidth: 520, mx: 'auto', textAlign: 'left' }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                    ✨ 添加新导师
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    填写下列信息，提交后将消耗 2 个代币。
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="导师姓名"
                      value={newTutorName}
                      onChange={(e) => setNewTutorName(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="学校"
                      value={newTutorSchool}
                      onChange={(e) => setNewTutorSchool(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="院系"
                      value={newTutorDepartment}
                      onChange={(e) => setNewTutorDepartment(e.target.value)}
                      fullWidth
                    />
                    {error && (
                      <Typography variant="caption" sx={{ color: 'error.main' }}>
                        {error}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Button
                        variant="contained"
                        onClick={handleAddTutor}
                        disabled={!user || user.tokens < 2}
                        sx={{
                          flex: 1,
                          borderRadius: 3,
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                        }}
                      >
                        确认添加 ( -2 代币 )
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => { setShowAddForm(false); setError(''); }}
                        sx={{ flex: 1, borderRadius: 3, fontWeight: 600 }}
                      >
                        取消
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Card>
          </Fade>
        )}
  </Box>
    </Box>
  );
}
