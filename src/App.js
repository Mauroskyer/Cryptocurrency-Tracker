import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/header';
import Home from './pages/home';
import CoinPage from './pages/coinPage';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';

function App() {
  const useStyles = makeStyles({
    root: {
      background: '#14161a',
      color: 'white',
      minHeight: '100vh',
    },
  });
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="coins/:id" element={<CoinPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
