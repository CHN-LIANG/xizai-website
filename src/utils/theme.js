export const THEME_STORAGE_KEY = 'xizai-theme';

export const themeOptions = [
  { value: 'system', label: '跟随系统' },
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
];

const isValidThemePreference = (value) => themeOptions.some((option) => option.value === value);

export const getStoredThemePreference = () => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isValidThemePreference(stored) ? stored : 'system';
};

export const getSystemTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const resolveTheme = (preference) => (preference === 'system' ? getSystemTheme() : preference);

export const applyThemePreference = (preference) => {
  if (typeof document === 'undefined') {
    return;
  }

  const safePreference = isValidThemePreference(preference) ? preference : 'system';
  const theme = resolveTheme(safePreference);
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.dataset.themePreference = safePreference;
  root.style.colorScheme = theme;

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute('content', theme === 'dark' ? '#07111F' : '#0D1B2A');
  }
};

export const getNextThemePreference = (preference) => {
  const currentIndex = themeOptions.findIndex((option) => option.value === preference);
  return themeOptions[(currentIndex + 1) % themeOptions.length].value;
};
