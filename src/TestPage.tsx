import React from 'react';
import { Container, Typography, Card, CardContent, Button } from '@mui/material';

export default function TestPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" sx={{ mb: 3, textAlign: 'center' }}>
        🎓 Web3 导师评价平台测试
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', p: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
            系统正常运行 ✅
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            如果您看到这个页面，说明React应用已成功启动
          </Typography>
          <Button variant="contained" size="large">
            测试按钮
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
