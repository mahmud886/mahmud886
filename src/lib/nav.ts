export const sections = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
];

export const THEME_EVENT = 'theme:toggle';
export const PALETTE_EVENT = 'palette:open';

export function setTheme(next: 'light' | 'dark') {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function toggleTheme() {
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
}
