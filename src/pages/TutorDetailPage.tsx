import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Star as StarIcon,
  School as SchoolIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useApp } from '../hooks/useApp';
import type { ReviewForm, Review } from '../types';

export default function TutorDetailPage() {
  const { state, dispatch } = useApp();
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showReviewsDialog, setShowReviewsDialog] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    overallRating: 0,
    personalityRating: 0,
    academicRating: 0,
    internshipRating: 0,
    content: '',
  });
  const [error, setError] = useState('');

  const tutor = state.selectedTutor;

  if (!tutor) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, width: '100%', boxSizing: 'border-box' }}>
        <Alert severity="info">请先选择一位导师</Alert>
      </Box>
    );
  }

  const handleSubmitReview = () => {
    setError('');

    // 检查用户代币
    if (!state.user || state.user.tokens < 2) {
      setError('代币不足，需要2个代币才能发布评价');
      return;
    }

    // 验证评分
    if (reviewForm.overallRating === 0 || reviewForm.personalityRating === 0 || 
        reviewForm.academicRating === 0 || reviewForm.internshipRating === 0) {
      setError('请完成所有评分');
      return;
    }

    if (!reviewForm.content.trim()) {
      setError('请填写评价内容');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      tutorId: tutor.id,
      userId: state.user.id,
      userEmail: state.user.email,
      ...reviewForm,
      timestamp: Date.now(),
      likes: 0,
      dislikes: 0,
      score: 0,
      cost: 2,
    };

    dispatch({ type: 'ADD_REVIEW', payload: { tutorId: tutor.id, review: newReview } });
    dispatch({ type: 'UPDATE_USER_TOKENS', payload: state.user.tokens - 2 });

    setShowReviewDialog(false);
    setReviewForm({
      overallRating: 0,
      personalityRating: 0,
      academicRating: 0,
      internshipRating: 0,
      content: '',
    });
  };

  const handleViewReviews = () => {
    if (!state.user || state.user.tokens < 1) {
      setError('代币不足，需要1个代币才能查看详细评价');
      return;
    }

    dispatch({ type: 'UPDATE_USER_TOKENS', payload: state.user.tokens - 1 });
    setShowReviewsDialog(true);
    setError('');
  };

  const handleLikeReview = (reviewId: string, isLike: boolean) => {
    dispatch({ type: 'LIKE_REVIEW', payload: { reviewId, isLike } });
    
    // 给评价作者1个代币
    const review = tutor.reviews.find(r => r.id === reviewId);
    if (review && isLike) {
      // 这里可以实现给评价作者代币的逻辑
    }
  };

  const getRatingColor = (rating: number): 'success' | 'warning' | 'error' => {
    if (rating >= 4.5) return 'success';
    if (rating >= 4.0) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '100%',
      p: { xs: 2, md: 4 },
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecf5 100%)'
    }}>
      {/* 返回按钮 */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => dispatch({ type: 'SET_SELECTED_TUTOR', payload: null })}
        sx={{ mb: 2 }}
      >
        返回搜索
      </Button>

      {/* 导师基本信息 */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                fontSize: '2rem',
                mr: 3 
              }}
            >
              {tutor.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {tutor.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" color="textSecondary">
                  {tutor.school}
                </Typography>
              </Box>
              <Typography variant="body1" color="textSecondary">
                {tutor.department} | ID: {tutor.id}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 评分概览 */}
          <Box sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
          }}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {tutor.overallRating.toFixed(1)}
              </Typography>
              <Rating
                value={tutor.overallRating}
                precision={0.1}
                readOnly
                size="large"
                sx={{ my: 1 }}
              />
              <Typography variant="body1" color="textSecondary">
                总体评分 ({tutor.reviewCount} 条评价)
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                <Chip
                  icon={<StarIcon />}
                  label={`学术水平 ${tutor.academicRating.toFixed(1)}`}
                  color={getRatingColor(tutor.academicRating)}
                  sx={{ width: '100%' }}
                />
                <Chip
                  icon={<PersonIcon />}
                  label={`性格水平 ${tutor.personalityRating.toFixed(1)}`}
                  color={getRatingColor(tutor.personalityRating)}
                  sx={{ width: '100%' }}
                />
                <Chip
                  label={`实习水平 ${tutor.internshipRating.toFixed(1)}`}
                  color={getRatingColor(tutor.internshipRating)}
                  sx={{ gridColumn: '1 / -1' }}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <Box sx={{
        mb: 3,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }
      }}>
        <Button
          fullWidth
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setShowReviewDialog(true)}
            size="large"
            sx={{ py: 1.5 }}
          >
            写评价 (消耗2代币)
          </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={handleViewReviews}
          size="large"
          sx={{ py: 1.5 }}
        >
          查看详细评价 (消耗1代币)
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 写评价对话框 */}
      <Dialog open={showReviewDialog} onClose={() => setShowReviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>评价 {tutor.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1, display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>总体推荐程度</Typography>
              <Rating
                value={reviewForm.overallRating}
                onChange={(_, value) => setReviewForm({ ...reviewForm, overallRating: value || 0 })}
                size="large"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>性格水平</Typography>
              <Rating
                value={reviewForm.personalityRating}
                onChange={(_, value) => setReviewForm({ ...reviewForm, personalityRating: value || 0 })}
                size="large"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>学术水平</Typography>
              <Rating
                value={reviewForm.academicRating}
                onChange={(_, value) => setReviewForm({ ...reviewForm, academicRating: value || 0 })}
                size="large"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>实习指导</Typography>
              <Rating
                value={reviewForm.internshipRating}
                onChange={(_, value) => setReviewForm({ ...reviewForm, internshipRating: value || 0 })}
                size="large"
              />
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="详细评价"
                value={reviewForm.content}
                onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                placeholder="请分享您对这位导师的详细评价..."
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewDialog(false)}>取消</Button>
          <Button onClick={handleSubmitReview} variant="contained">
            提交评价
          </Button>
        </DialogActions>
      </Dialog>

      {/* 查看评价对话框 */}
      <Dialog open={showReviewsDialog} onClose={() => setShowReviewsDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>详细评价</DialogTitle>
        <DialogContent>
          <List>
            {tutor.reviews
              .sort((a, b) => b.score - a.score)
              .map((review) => (
              <ListItem key={review.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {review.userEmail.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="subtitle2">
                        {review.userEmail}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                        <Chip size="small" label={`总体 ${review.overallRating}`} />
                        <Chip size="small" label={`学术 ${review.academicRating}`} />
                        <Chip size="small" label={`性格 ${review.personalityRating}`} />
                        <Chip size="small" label={`实习 ${review.internshipRating}`} />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                        {review.content}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => handleLikeReview(review.id, true)}
                          color="primary"
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <Typography variant="caption">{review.likes}</Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => handleLikeReview(review.id, false)}
                          color="error"
                        >
                          <ThumbDownIcon />
                        </IconButton>
                        <Typography variant="caption">{review.dislikes}</Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                          积分: {review.score}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
          {tutor.reviews.length === 0 && (
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
              暂无评价
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewsDialog(false)}>关闭</Button>
        </DialogActions>
      </Dialog>
  </Box>
  );
}
