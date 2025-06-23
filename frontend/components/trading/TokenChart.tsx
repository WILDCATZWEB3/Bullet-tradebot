'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function TokenChart({ tokenAddress }: { tokenAddress: string }) {
  const [chartData, setChartData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('5m');
  const [isLoading, setIsLoading] = useState(false);

  const fetchChartData = async () => {
    if (!tokenAddress) return;
    
    setIsLoading(true);
    try {
      // In production, this should go through your backend API
      const response = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      
      const pairData = response.data.pairs?.[0];
      if (!pairData) {
        throw new Error('No pair data found');
      }

      // For demo - generate mock historical data
      const mockHistory = generateMockHistory(
        pairData.priceUsd,
        timeframe === '5m' ? 12 : timeframe === '15m' ? 24 : 30
      );

      setChartData({
        currentPrice: pairData.priceUsd,
        history: mockHistory,
      });
    } catch (error) {
      console.error('Failed to fetch chart data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [tokenAddress, timeframe]);

  const generateMockHistory = (currentPrice: string, count: number) => {
    const prices = [];
    let price = parseFloat(currentPrice);
    
    for (let i = 0; i < count; i++) {
      // Simulate price movement
      price *= (1 + (Math.random() * 0.02 - 0.01));
      prices.push(price);
    }

    return {
      labels: Array.from({ length: count }, (_, i) => `${i * 5}min`),
      datasets: [{
        label: 'Price',
        data: prices,
        borderColor: '#f59e0b',
        tension: 0.1,
      }]
    };
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Token Chart</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('5m')}
            className={`px-3 py-1 rounded text-sm ${timeframe === '5m' ? 'bg-yellow-600' : 'bg-gray-700'}`}
          >
            5m
          </button>
          <button
            onClick={() => setTimeframe('15m')}
            className={`px-3 py-1 rounded text-sm ${timeframe === '15m' ? 'bg-yellow-600' : 'bg-gray-700'}`}
          >
            15m
          </button>
          <button
            onClick={() => setTimeframe('1h')}
            className={`px-3 py-1 rounded text-sm ${timeframe === '1h' ? 'bg-yellow-600' : 'bg-gray-700'}`}
          >
            1h
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : chartData ? (
        <div className="h-64">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Current Price</span>
            <span className="font-bold">${parseFloat(chartData.currentPrice).toFixed(6)}</span>
          </div>
          <Line
            data={chartData.history}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: '#9CA3AF',
                  },
                },
                y: {
                  grid: {
                    color: '#374151',
                  },
                  ticks: {
                    color: '#9CA3AF',
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-400">
          {tokenAddress ? 'No chart data available' : 'Enter token address to view chart'}
        </div>
      )}
    </div>
  );
}
