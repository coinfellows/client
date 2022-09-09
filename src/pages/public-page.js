import React from 'react';
import { Box, Typography } from '@mui/material';
import UnsignedLayout from '../components/unsigned-layout';

export default function PublicPage() {
  return (
    <UnsignedLayout>
      <Box mt={4}>
        <Typography variant='h3' gutterBottom>
          Your treasure matters
        </Typography>
        <Typography variant='h5' gutterBottom>
          Use Coin Fellows to track your cryptocurrency and keep your eyes on the market. Sign up for free today.
        </Typography>
      </Box>
    </UnsignedLayout>
  )
}