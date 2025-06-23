'use client';

import { Switch } from '@headlessui/react';

export function DemoModeToggle({
  isDemoMode,
  setIsDemoMode,
}: {
  isDemoMode: boolean;
  setIsDemoMode: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
      <div>
        <h3 className="font-medium">{isDemoMode ? 'Demo Mode' : 'Real Trading Mode'}</h3>
        <p className="text-sm text-gray-400">
          {isDemoMode
            ? 'Practicing with virtual funds'
            : 'Trading with real SOL'}
        </p>
      </div>
      <Switch
        checked={isDemoMode}
        onChange={setIsDemoMode}
        className={`${
          isDemoMode ? 'bg-yellow-500' : 'bg-green-500'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            isDemoMode ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  );
}
