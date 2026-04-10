// ═══════════════════════════════════════════════════════════════
// Lightweight event bus for cross-module communication
// ═══════════════════════════════════════════════════════════════

const _listeners = {};

export function on(event, fn) {
  if (!_listeners[event]) _listeners[event] = [];
  _listeners[event].push(fn);
  return () => off(event, fn);
}

export function off(event, fn) {
  if (!_listeners[event]) return;
  _listeners[event] = _listeners[event].filter(f => f !== fn);
}

export function emit(event, data) {
  if (!_listeners[event]) return;
  _listeners[event].forEach(fn => fn(data));
}
