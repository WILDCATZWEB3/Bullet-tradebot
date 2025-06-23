'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';
import { DemoModeToggle } from './DemoModeToggle';
import { TradingPanel } from './TradingPanel';
import { BalanceDisplay } from './BalanceDisplay';
import { TransactionHistory } from './TransactionHistory';

export function Dashboard() {
  const { publicKey } = useWallet();
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // Load initial data
  useEffect(() => {
    if (isDemoMode) {
      // Load demo balance from localStorage
      const demoBalance = localStorage.getItem('bullet-trade-demo-balance');
      setBalance(demoBalance ? parseFloat(demoBalance) : 100); // Default $100 demo balance
    } else {
      // TODO: Fetch real balance from Solana blockchain
      setBalance(0);
    }
  }, [isDemoMode, publicKey]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          BulletTrade
        </h1>
        <WalletMultiButton className="!bg-yellow-500 !text-gray-900 hover:!bg-yellow-400" />
      </div>

      <DemoModeToggle 
        isDemoMode={isDemoMode} 
        setIsDemoMode={setIsDemoMode} 
      />

      <BalanceDisplay 
        balance={balance} 
        isDemoMode={isDemoMode} 
      />

      <TradingPanel 
        isDemoMode={isDemoMode} 
        balance={balance} 
        setBalance={setBalance} 
      />

      <TransactionHistory 
        transactions={transactions} 
        isDemoMode={isDemoMode} 
      />
    </div>
  );
}
