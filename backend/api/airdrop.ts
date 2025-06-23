import { NextApiRequest, NextApiResponse } from 'next';
import { PublicKey } from '@solana/web3.js';
import { checkEligibility } from '../../lib/airdrop';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { wallet } = req.body;
  
  try {
    // Validate wallet address
    new PublicKey(wallet);
    
    // Check eligibility
    const { eligible, amount } = await checkEligibility(wallet);
    
    if (!eligible) {
      return res.status(400).json({ message: 'Not eligible for airdrop' });
    }

    // Here you would actually process the airdrop transaction
    // For now we'll just return a success message
    return res.status(200).json({ 
      success: true,
      amount,
      message: `Airdrop of ${amount} $BULLET will be processed`
    });
    
  } catch (error) {
    console.error('Airdrop error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
