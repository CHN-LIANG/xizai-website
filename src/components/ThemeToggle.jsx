import { Monitor, Moon, Sun } from 'lucide-react';
import { THEME_STORAGE_KEY, applyThemePreference, getNextThemePreference, getStoredThemePreference, themeOptions } from '../utils/theme.js';

const themeIcons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export function getInitialThemePreference() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.themePreference) {
    return document.documentElement.dataset.themePreference;
  }

  return getStoredThemePreference();
}

export function persistThemePreference(themePreference) {
  applyThemePreference(themePreference);

  if (themePreference === 'system') {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
}

export default function ThemeToggle({ value, onChange, className = 'theme-toggle' }) {
  const activeThemeOption = themeOptions.find((option) => option.value === value) || themeOptions[0];
  const ThemeIcon = themeIcons[activeThemeOption.value] || Monitor;

  return (
    <button className={className} type="button" aria-label={`切换主题，当前为${activeThemeOption.label}`} onClick={() => onChange(getNextThemePreference(value))}>
      <ThemeIcon aria-hidden="true" size={17} strokeWidth={1.9} />
      <span>{activeThemeOption.label}</span>
    </button>
  );
}
