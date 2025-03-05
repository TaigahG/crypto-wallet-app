import React, { useState, useEffect } from 'react';
import './App.css';
import ConnectWallet from './components/ConnectWallet';
import CryptoTicker from './components/CryptoTicker';
import WalletInfo from './components/WalletInfo';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,cardano,bittensor&order=market_cap_desc&per_page=6&page=1&sparkline=true');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setCryptoData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Failed to fetch cryptocurrency data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Wallet Dashboard</h1>
        
        <ConnectWallet 
          setAccount={setAccount} 
          setBalance={setBalance} 
          setIsConnected={setIsConnected}
        />
        
        {isConnected && (
          <WalletInfo 
            account={account} 
            balance={balance} 
          />
        )}
        
        <div className="crypto-container">
          <h2>Top Cryptocurrencies</h2>
          {loading ? (
            <p>Loading cryptocurrency data...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="crypto-grid">
              {cryptoData.map((crypto) => (
                <CryptoTicker 
                  key={crypto.id}
                  name={crypto.name}
                  symbol={crypto.symbol.toUpperCase()}
                  price={crypto.current_price}
                  priceChange={crypto.price_change_percentage_24h}
                  image={crypto.image}
                />
              ))}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;