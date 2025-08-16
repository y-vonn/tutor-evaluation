import { Typography, Card, CardContent, Box, Chip } from '@mui/material';
import { Avatar, Divider, Button, Tooltip, LinearProgress } from '@mui/material';
import { Star as StarIcon, History as HistoryIcon, MonetizationOn as TokenIcon } from '@mui/icons-material';
import { useApp } from '../hooks/useApp';

export default function ProfilePage() {
  const { state } = useApp();
  const user = state.user;

  if (!user) {
  return <Box sx={{ p: 4 }}><Typography>请先登录</Typography></Box>;
  }

  const viewedTutors = state.tutors.filter(tutor => 
    user.browsingHistory.includes(tutor.id)
  );

  return (
    <Box sx={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      boxSizing: 'border-box',
      p: { xs: 2, md: 4 },
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecf5 100%)'
    }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '.5px' }}>个人中心</Typography>
        <Typography variant="body1" color="text.secondary">欢迎回来，下面是你的账户概览</Typography>
      </Box>

      <Box sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }
      }}>
        {/* 用户 / 代币卡 */}
        <Card sx={{
          borderRadius: 4,
          background: 'linear-gradient(135deg,#5b7de8 0%,#6d5ad5 100%)',
          color: 'white',
          boxShadow: '0 15px 40px -10px rgba(91,125,232,.4)'
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'rgba(255,255,255,0.25)', width: 56, height:56, fontSize: 24, fontWeight:700 }}>
                {user.email.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>登录邮箱</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{user.email}</Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.25)', mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.85, display:'flex', alignItems:'center', justifyContent:'center', gap:1 }}>
                <TokenIcon fontSize="small" /> 当前代币
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>{user.tokens}</Typography>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(100, (user.tokens / 50) * 100)}
                sx={{ mt: 2, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.25)', '& .MuiLinearProgress-bar': { backgroundColor: 'white' } }}
              />
              <Typography variant="caption" sx={{ mt: 1, display:'block', opacity:0.85 }}>进度参考：满格按 50 代币显示</Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2, color:'white', borderColor:'rgba(255,255,255,0.6)', '&:hover': { borderColor:'white', background:'rgba(255,255,255,0.1)' } }}
              >获取更多代币</Button>
            </Box>
          </CardContent>
        </Card>

        {/* 浏览历史 */}
        <Card sx={{ borderRadius: 4, display: 'flex', flexDirection:'column' }}>
          <CardContent sx={{ flex:1, display:'flex', flexDirection:'column' }}>
            <Box sx={{ display:'flex', alignItems:'center', mb:2, justifyContent:'space-between' }}>
              <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
                <HistoryIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight:700 }}>浏览历史</Typography>
                <Chip size="small" label={viewedTutors.length} color="primary" variant="outlined" />
              </Box>
              {viewedTutors.length>0 && (
                <Button size="small" onClick={()=>{ /* 预留清空逻辑 */ }} disabled>清空</Button>
              )}
            </Box>
            {viewedTutors.length > 0 ? (
              <Box sx={{
                display:'grid',
                gridTemplateColumns:{ xs:'1fr', sm:'repeat(2,1fr)', lg:'repeat(3,1fr)' },
                gap:2
              }}>
                {viewedTutors.map((tutor, idx) => (
                  <Card key={tutor.id} elevation={0} sx={{
                    p:1.5,
                    borderRadius:3,
                    border:'1px solid',
                    borderColor:'grey.200',
                    background:'#fff',
                    position:'relative',
                    overflow:'hidden',
                    '&:before':{
                      content:'""',
                      position:'absolute',
                      inset:0,
                      background: idx===0 ? 'linear-gradient(135deg,#667eea22,#764ba222)' : 'transparent'
                    }
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight:600, mb: .5 }}>{tutor.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: .5 }}>{tutor.school}</Typography>
                    <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
                      <Chip size="small" icon={<StarIcon sx={{ fontSize:16 }} />} label={tutor.overallRating.toFixed(1)} sx={{ fontWeight:600 }} />
                      <Tooltip title={`学术 ${tutor.academicRating.toFixed(1)} · 性格 ${tutor.personalityRating.toFixed(1)}`}> 
                        <Chip size="small" variant="outlined" label={'学术 '+tutor.academicRating.toFixed(1)} />
                      </Tooltip>
                    </Box>
                  </Card>
                ))}
              </Box>
            ) : (
              <Box sx={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', py:6 }}>
                <Typography color="text.secondary">暂无浏览记录</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
