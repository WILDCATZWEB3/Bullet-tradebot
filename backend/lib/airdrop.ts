import { db } from './db';

interface AirdropEligibility {
  eligible: boolean;
  amount: number;
  reason?: string;
}

export async function checkEligibility(wallet: string): Promise<AirdropEligibility> {
  // Check if wallet already claimed
  const existing = await db.collection('airdrops').findOne({ wallet });
  if (existing) {
    return {
      eligible: false,
      amount: 0,
      reason: 'Already claimed'
    };
  }

  // Get points from DB (in a real app)
  const pointsRecord = await db.collection('points').findOne({ wallet });
  const points = pointsRecord?.points || 0;

  if (points < 1000) {
    return {
      eligible: false,
      amount: 0,
      reason: 'Insufficient points'
    };
  }

  // Calculate airdrop amount with potential bonuses
  const baseAmount = Math.floor(points / 1000) * 1000;
  const bonusMultiplier = getEarlyAdopterBonus(wallet);
  const totalAmount = Math.floor(baseAmount * bonusMultiplier);

  return {
    eligible: true,
    amount: totalAmount
  };
}

function getEarlyAdopterBonus(wallet: string): number {
  // In a real app, you might check how early the user joined
  return 1.2; // 20% bonus for early adopters
}
