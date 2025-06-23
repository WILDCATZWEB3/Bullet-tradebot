'use client';

import { useWallet } from '@solana/wallet-adapter-react';

export function BalanceDisplay({
  balance,
  isDemoMode,
}: {
  balance: number;
  isDemoMode: boolean;
}) {
  const { publicKey } = useWallet();

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Balance</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">
            {isDemoMode ? 'Demo Balance' : 'Real Balance'}
          </p>
          <p className="text-2xl font-bold">
            {balance.toFixed(2)} {isDemoMode ? 'USD' : 'SOL'}
          </p>
        </div>
        {!isDemoMode && publicKey && (
          <p className="text-sm text-gray-400">
            Connected: {publicKey.toString().slice(0, 4)}...
            {publicKey.toString().slice(-4)}
          </p>
        )}
      </div>
    </div>
  );
}
