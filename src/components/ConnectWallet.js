import React, { useState } from 'react';
import { ethers } from 'ethers';
import './ConnectWallet.css';

const ConnectWallet = ({ setAccount, setBalance, setIsConnected }) => {
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [error, setError] = useState('');
  const formatEther = (balance) => {
    return parseFloat(ethers.utils.formatEther(balance)).toFixed(4);
  };

  const connectWallet = async () => {
    setConnectingWallet(true);
    setError('');

    try {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
          
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          
          const balance = await provider.getBalance(accounts[0]);
          
          setAccount(accounts[0]);
          setBalance(formatEther(balance));
          setIsConnected(true);
          
          window.ethereum.on('accountsChanged', async (newAccounts) => {
            if (newAccounts.length === 0) {
              setAccount('');
              setBalance('');
              setIsConnected(false);
            } else {
              setAccount(newAccounts[0]);
              const newBalance = await provider.getBalance(newAccounts[0]);
              setBalance(formatEther(newBalance));
            }
          });
        } catch (err) {
          console.error('User rejected connection request', err);
          setError('Connection request was rejected');
          setIsConnected(false);
        }
      } else {
        setError('MetaMask is not installed. Please install MetaMask to connect your wallet.');
        setIsConnected(false);
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect to wallet');
      setIsConnected(false);
    } finally {
      setConnectingWallet(false);
    }
  };

  return (
    <div className="connect-wallet-container">
      <button 
        className="connect-wallet-button" 
        onClick={connectWallet}
        disabled={connectingWallet}
      >
        {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
      </button>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ConnectWallet;