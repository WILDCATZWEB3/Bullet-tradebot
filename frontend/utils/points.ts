import { PublicKey } from '@solana/web3.js';
import { encryptData, decryptData } from './security';

const POINTS_KEY = 'bullet-trade-points';

export interface PointsRecord {
  wallet: string;
  points: number;
  lastUpdated: Date;
  transactions: Transaction[];
}

interface Transaction {
  hash: string;
  pointsEarned: number;
  timestamp: Date;
}

export function getPoints(wallet: PublicKey): PointsRecord | null {
  const encryptedData = localStorage.getItem(POINTS_KEY);
  if (!encryptedData) return null;

  try {
    const decrypted = decryptData(encryptedData);
    const records: PointsRecord[] = JSON.parse(decrypted);
    return records.find(r => r.wallet === wallet.toString()) || null;
  } catch (error) {
    console.error('Failed to decrypt points', error);
    return null;
  }
}

export function addPoints(wallet: PublicKey, points: number, txHash: string): PointsRecord {
  const existing = getPoints(wallet);
  const newRecord: PointsRecord = existing || {
    wallet: wallet.toString(),
    points: 0,
    lastUpdated: new Date(),
    transactions: []
  };

  newRecord.points += points;
  newRecord.lastUpdated = new Date();
  newRecord.transactions.push({
    hash: txHash,
    pointsEarned: points,
    timestamp: new Date()
  });

  updatePointsStorage(newRecord);
  return newRecord;
}

function updatePointsStorage(record: PointsRecord) {
  const encryptedData = localStorage.getItem(POINTS_KEY);
  let records: PointsRecord[] = [];

  if (encryptedData) {
    try {
      const decrypted = decryptData(encryptedData);
      records = JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt existing points', error);
    }
  }

  const existingIndex = records.findIndex(r => r.wallet === record.wallet);
  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
  }

  localStorage.setItem(POINTS_KEY, encryptData(JSON.stringify(records)));
}

// Initialize with demo points if none exist
export function initializeDemoPoints(wallet: PublicKey) {
  if (!getPoints(wallet)) {
    addPoints(wallet, 0, 'demo-init');
  }
}
