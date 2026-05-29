'use client';

import { useState, useEffect } from 'react';
import { subscribeToasts, type ToastItem } from '@/lib/toast';

const STYLES: Record<ToastItem['type'], string> = {
  success: 'bg-[#1B5E20] text-white',
  error:   'bg-[#B71C1C] text-white',
  info:    'bg-[#023540] text-white',
};

const ICONS: Record<ToastItem['type'], string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => subscribeToasts(setToasts), []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-[200px] max-w-[360px] pointer-events-auto
            animate-in fade-in slide-in-from-top-2 duration-200 ${STYLES[t.type]}`}
        >
          <span className="text-base leading-none">{ICONS[t.type]}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
