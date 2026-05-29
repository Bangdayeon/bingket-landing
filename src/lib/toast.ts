'use client';

export type ToastType = 'success' | 'error' | 'info';
export interface ToastItem { id: string; message: string; type: ToastType }

type Listener = (toasts: ToastItem[]) => void;

let items: ToastItem[] = [];
const listeners = new Set<Listener>();

function notify() {
  const snapshot = [...items];
  listeners.forEach((l) => l(snapshot));
}

export function toast(message: string, type: ToastType = 'info', duration = 3000) {
  const id = Math.random().toString(36).slice(2);
  items = [...items, { id, message, type }];
  notify();
  setTimeout(() => {
    items = items.filter((t) => t.id !== id);
    notify();
  }, duration);
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  listener([...items]);
  return () => listeners.delete(listener);
}
