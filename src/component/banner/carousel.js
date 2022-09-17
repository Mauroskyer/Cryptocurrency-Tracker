import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { CryptoStates } from '../../cryptoContext';
import { TrendingCoins } from '../../config/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';

export function numberWithCommas(x) {
  /* to show commas in quantities */
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoStates();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins([currency]));

    setTrending(data);
  };

  const useStyles = makeStyles({
    carousel: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    carouselItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: 'white',
    },
  });

  const classes = useStyles();

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    /* calculates the gain */
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            /* will show green on gain and red on loss. */
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        diseableDotsControls
        disableButtonControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}
