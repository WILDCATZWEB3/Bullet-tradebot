'use client';

export function TransactionHistory({
  transactions,
  isDemoMode,
}: {
  transactions: any[];
  isDemoMode: boolean;
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      {transactions.length > 0 ? (
        <div className="space-y-3">
          {transactions.map((tx, index) => (
            <div key={index} className="flex justify-between p-3 bg-gray-700 rounded-md">
              <div>
                <p className="font-medium">{tx.action.toUpperCase()} {tx.token}</p>
                <p className="text-sm text-gray-400">{tx.time}</p>
              </div>
              <p className={tx.action === 'buy' ? 'text-green-400' : 'text-red-400'}>
                {tx.action === 'buy' ? '-' : '+'}{tx.amount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">
          {isDemoMode 
            ? 'Your demo trades will appear here'
            : 'Your real trades will appear here'}
        </p>
      )}
    </div>
  );
}
