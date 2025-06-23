import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'bullet-trade-secret';

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function generateTempWallet() {
  // This is for demo purposes only - real wallets should use proper key generation
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
