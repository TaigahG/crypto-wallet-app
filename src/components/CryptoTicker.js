import React from 'react';
import './CryptoTicker.css';

const CryptoTicker = ({ name, symbol, price, priceChange, image }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const getPriceChangeColor = (priceChange) => {
    return priceChange >= 0 ? 'positive' : 'negative';
  };

  const formatPriceChange = (priceChange) => {
    const sign = priceChange >= 0 ? '+' : '';
    return `${sign}${priceChange?.toFixed(2)}%`;
  };

  return (
    <div className="crypto-ticker">
      <div className="crypto-info">
        <img src={image} alt={`${name} logo`} className="crypto-logo" />
        <div className="crypto-name-container">
          <h3 className="crypto-name">{name}</h3>
          <span className="crypto-symbol">{symbol}</span>
        </div>
      </div>
      
      <div className="crypto-price-container">
        <div className="crypto-price">{formatPrice(price)}</div>
        <div className={`crypto-price-change ${getPriceChangeColor(priceChange)}`}>
          {formatPriceChange(priceChange)}
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;