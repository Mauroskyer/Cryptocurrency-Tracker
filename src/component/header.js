import {
  makeStyles,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CryptoStates } from '../cryptoContext';

export default function Header() {
  const useStyles = makeStyles({
    title: {
      flex: 1,
      color: 'white',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  });
  const classes = useStyles();
  const { currency, setCurrency } = CryptoStates();

  function handleChange(e) {
    const value = e.target.value;
    setCurrency(value);
  }

  return (
    <AppBar color="primary" position="static">
      <Container>
        <Toolbar>
          <Link className={classes.title} to="/">
            <Typography variant="h6">Crypto Hunter</Typography>
          </Link>

          <Select
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginLeft: 15,
              color: 'white',
            }}
            value={currency}
            onChange={handleChange}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
