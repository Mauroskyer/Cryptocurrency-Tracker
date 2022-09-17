import { createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext();

export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  useEffect(() => {
    if (currency === 'USD') {
      setSymbol('$');
    } else if (currency === 'EUR') {
      setSymbol('€');
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
}

export function CryptoStates() {
  return useContext(Crypto);
}
