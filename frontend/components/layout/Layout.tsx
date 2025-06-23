'use client';

import { SolanaProvider } from '@/providers/WalletProvider';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SolanaProvider>
      <Head>
        <title>BulletTrade | Solana Trading Bot</title>
        <meta name="description" content="High-speed Solana trading bot for memecoins and new tokens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </div>
    </SolanaProvider>
  );
}
