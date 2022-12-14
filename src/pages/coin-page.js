import React, { useEffect, useCallback, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom'
import PageLayout from '../components/page-layout';
import axios from 'axios';
import {
  Box, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  Typography,
  Divider,
  ButtonGroup, 
} from '@mui/material';
import numeral from 'numeral';
import { KeyboardDoubleArrowUp, KeyboardDoubleArrowDown } from '@mui/icons-material'
import NewChart from '../components/coin-chart';

export default function CoinPage() {
  const { isAuthenticated } = useAuth0();
  const [coinData, setCoinData] = useState(null);
  const [days, setDays] = useState(7);
  const params = useParams();


  const getCoinData = useCallback(async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_AUTH0_SERVER_URL}/coins/${params.id}`,
        {
          params: {
            days: days,
          }
        });
      const responseData = response.data;
      setCoinData(responseData)
    } catch (error) {
      console.error(error.message)
    }
  }, [params.id, days])


  useEffect(() => {
    getCoinData();
  }, [getCoinData]);
  if (isAuthenticated && !coinData) {
    return (
      <PageLayout/>
    )
  }
  if (isAuthenticated && coinData) {
  return (
    <PageLayout>
      <>
        <Card p={4} sx={{minWidth: '500px', maxWidth: '99%'}}>
        <CardContent>
        <Box display='flex'>
        <Typography variant='h4'>{coinData.name}</Typography>
        <Box ml='auto'>
          <ButtonGroup>
            <Button size='small' onClick={() => setDays(1)} variant={days === 1 ? 'contained' : 'outlined'}>24h</Button>
            <Button size='small' onClick={() => setDays(7)} variant={days === 7 ? 'contained' : 'outlined'}>7d</Button>
            <Button size='small' onClick={() => setDays(30)} variant={days === 30 ? 'contained' : 'outlined'}>30d</Button>
          </ButtonGroup>
        </Box>
        </Box>
        <Typography variant='h4' color='#cccccc'>{numeral(coinData.current_price).format('$0,.00')}</Typography>
        <Box mb={2} position='relative'>
          <NewChart title={coinData.name} data={coinData.chart} days={days}/>
        </Box>
        <Typography variant='h6' gutterBottom color='#aaaaaa'>Market Stats</Typography>
        <Box display='flex' mb={2}>
          <Box mr={2}>
            <Typography color='#aaaaaa' fontWeight={600}>Market Cap</Typography>
            <Typography textTransform='uppercase'>{numeral(coinData.market_cap).format('$0.00a')}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box mx={2}>
            <Typography color='#aaaaaa' fontWeight={600}>Total Volume</Typography>
            <Typography textTransform='uppercase'>{numeral(coinData.total_volume).format('$0.00a')}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box mx={2}>
            <Typography color='#aaaaaa' fontWeight={600}>Circulating Supply</Typography>
            <Typography textTransform='uppercase'>{numeral(coinData.circulating_supply).format('0.00a')} {coinData.symbol}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box mx={2}>
            <Typography color='#aaaaaa' fontWeight={600}>All Time High</Typography>
            <Typography>{numeral(coinData.ath).format('$0,.00')}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box mx={2}>
            <Typography color='#aaaaaa' fontWeight={600}>Rank</Typography>
            <Typography># {coinData.rank}</Typography>
          </Box>
        </Box>
          <Divider/>
        <Typography mt={1} variant='h6' gutterBottom color='#aaaaaa'>Price Change %</Typography>
        <Box display='flex' mb={0}>
          <Box mr={2} mb={2}>
            <Typography color='#aaaaaa' fontWeight={600} ml='4px' mb={.5}>24 hours</Typography>
            <Chip 
              variant='outlined' 
              icon={(coinData.price_change_7d > 0) ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
              color={(coinData.price_change_24h > 0) ? 'success' : 'error'} 
              label={numeral(coinData.price_change_24h / 100).format('0.00%')}>
            </Chip>
          </Box>
          <Divider variant='middle' orientation="vertical" flexItem />
          <Box mx={2}>
            <Typography color='#aaaaaa' fontWeight={600} ml='4px' mb={.5}>7 days</Typography>
            <Chip 
              variant='outlined'
              icon={(coinData.price_change_7d > 0) ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
              color={(coinData.price_change_7d > 0) ? 'success' : 'error'} 
              label={numeral(coinData.price_change_7d / 100).format('0.00%')}>
            </Chip>
          </Box>
          <Divider variant='middle' orientation="vertical" flexItem />
          <Box mx={2}>
            <Typography color='#aaaaaa' fontWeight={600} ml='4px' mb={.5}>30 days</Typography>
            <Chip 
              variant='outlined' 
              color={(coinData.price_change_30d > 0) ? 'success' : 'error'} 
              icon={(coinData.price_change_30d > 0) ? <KeyboardDoubleArrowUp/> : <KeyboardDoubleArrowDown/>}
              label={numeral(coinData.price_change_30d / 100).format('0.00%')}>
            </Chip>
          </Box>
        </Box>
        </CardContent>
        </Card>
      </>
    </PageLayout>
  )}
}

