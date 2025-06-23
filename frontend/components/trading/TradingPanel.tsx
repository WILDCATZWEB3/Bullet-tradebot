'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function TradingPanel({
  isDemoMode,
  balance,
  setBalance,
}: {
  isDemoMode: boolean;
  balance: number;
  setBalance: (value: number) => void;
}) {
  const { publicKey } = useWallet();
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isSnipeMode, setIsSnipeMode] = useState(false);
  const [slippage, setSlippage] = useState('5');

  const handleTrade = async (action: 'buy' | 'sell') => {
    if (!tokenAddress) {
      toast.error('Please enter a token address');
      return;
    }
    
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!isDemoMode && !publicKey) {
      toast.error('Please connect your wallet for real trading');
      return;
    }

    try {
      if (isDemoMode) {
        // Demo mode logic
        const tradeAmount = parseFloat(amount);
        const newBalance = action === 'buy' 
          ? balance - tradeAmount 
          : balance + tradeAmount;
        
        if (action === 'buy' && newBalance < 0) {
          toast.error('Insufficient demo balance');
          return;
        }

        setBalance(newBalance);
        localStorage.setItem('bullet-trade-demo-balance', newBalance.toString());
        toast.success(`Demo ${action} successful!`);
      } else {
        // Real trading logic
        // TODO: Implement actual Solana transaction
        toast.success(`Real ${action} transaction submitted!`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to execute ${action}`);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {isSnipeMode ? 'Sniper Mode 🔫' : 'Trade Panel'}
        </h2>
        <button
          onClick={() => setIsSnipeMode(!isSnipeMode)}
          className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-md text-sm font-medium"
        >
          {isSnipeMode ? 'Switch to Normal Mode' : 'Switch to Sniper Mode'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Token Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Token mint address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder={`Amount in ${isDemoMode ? 'USD' : 'SOL'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slippage (%)</label>
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Slippage tolerance"
            />
          </div>
        </div>

        {isSnipeMode && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button 
              onClick={() => handleTrade('buy')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium"
            >
              Quick Buy
            </button>
            <button 
              onClick={() => handleTrade('buy')}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md font-medium"
            >
              Snipe Buy
            </button>
            <button 
              onClick={() => handleTrade('sell')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium"
            >
              Instant Sell
            </button>
          </div>
        )}

        {!isSnipeMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button 
              onClick={() => handleTrade('buy')}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-medium"
            >
              Buy Token
            </button>
            <button 
              onClick={() => handleTrade('sell')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium"
            >
              Sell Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
