'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getPoints, claimAirdrop } from '@/utils/points';
import toast from 'react-hot-toast';

export function AirdropSection() {
  const { publicKey } = useWallet();
  const [isClaiming, setIsClaiming] = useState(false);
  
  const pointsRecord = publicKey ? getPoints(publicKey) : null;
  const points = pointsRecord?.points || 0;

  const handleClaim = async () => {
    if (!publicKey) return;
    
    setIsClaiming(true);
    try {
      // In a real app, this would call your backend API
      await claimAirdrop(publicKey);
      toast.success('Airdrop claimed successfully! Tokens will be sent to your wallet.');
    } catch (error) {
      console.error('Failed to claim airdrop', error);
      toast.error('Failed to claim airdrop');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Rewards & Airdrop</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium">BulletPoints</h3>
            <p className="text-sm text-gray-400">Earned from trading</p>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {points.toLocaleString()}
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium">$BULLET Airdrop</h3>
            <p className="text-sm text-gray-400">
              {points >= 1000 ? 'Ready to claim!' : `${1000 - points} more points needed`}
            </p>
          </div>
          <button
            onClick={handleClaim}
            disabled={!publicKey || points < 1000 || isClaiming}
            className={`px-4 py-2 rounded-md font-medium ${
              publicKey && points >= 1000
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            {isClaiming ? 'Claiming...' : 'Claim Airdrop'}
          </button>
        </div>

        <div className="p-4 bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2">How it works</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Earn 5 BulletPoints per real trade</li>
            <li>• 1000 Points = 1000 $BULLET tokens</li>
            <li>• Tokens vest over 3 months</li>
            <li>• Early supporters get bonus multipliers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
