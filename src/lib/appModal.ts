'use client';

type Listener = (open: boolean) => void;

let open = false;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l(open));
}

export function openAppInstallModal() {
  open = true;
  notify();
}

export function closeAppInstallModal() {
  open = false;
  notify();
}

export function subscribeAppModal(listener: Listener): () => void {
  listeners.add(listener);
  listener(open);
  return () => listeners.delete(listener);
}
