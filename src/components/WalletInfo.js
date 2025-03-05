import React from 'react';
import './WalletInfo.css';

const WalletInfo = ({ account, balance }) => {
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="wallet-info-container">
      <div className="wallet-card">
        <h2>Wallet Information</h2>
        
        <div className="wallet-details">
          <div className="wallet-item">
            <span className="label">Address:</span>
            <span className="value address" title={account}>{formatAddress(account)}</span>
          </div>
          
          <div className="wallet-item">
            <span className="label">ETH Balance:</span>
            <div className="balance-container">
              <span className="value">{balance}</span>
              <span className="currency">ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;