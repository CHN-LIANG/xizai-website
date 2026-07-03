import { useEffect, useState } from 'react';
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { navItems } from '../data/siteData.js';
import TaiHexagramLogo from './TaiHexagramLogo.jsx';
import { THEME_STORAGE_KEY, applyThemePreference, getNextThemePreference, getStoredThemePreference, themeOptions } from '../utils/theme.js';

const themeIcons = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [themePreference, setThemePreference] = useState(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.themePreference) {
      return document.documentElement.dataset.themePreference;
    }

    return getStoredThemePreference();
  });
  const activeThemeOption = themeOptions.find((option) => option.value === themePreference) || themeOptions[0];
  const ThemeIcon = themeIcons[activeThemeOption.value] || Monitor;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    applyThemePreference(themePreference);

    if (themePreference === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
  }, [themePreference]);

  useEffect(() => {
    if (themePreference !== 'system' || !window.matchMedia) {
      return undefined;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemThemeChange = () => applyThemePreference('system');
    media.addEventListener?.('change', onSystemThemeChange);
    return () => media.removeEventListener?.('change', onSystemThemeChange);
  }, [themePreference]);

  const cycleTheme = () => {
    setThemePreference((value) => getNextThemePreference(value));
  };

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a className="brand" href="/#home" aria-label="返回首页">
        <TaiHexagramLogo compact />
        <span>
          <strong>熙载咨询</strong>
          <small>县域产业与企业服务</small>
        </span>
      </a>

      <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="主导航">
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <button className="theme-toggle" type="button" aria-label={`切换主题，当前为${activeThemeOption.label}`} onClick={cycleTheme}>
          <ThemeIcon aria-hidden="true" size={17} strokeWidth={1.9} />
          <span>{activeThemeOption.label}</span>
        </button>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? '关闭导航' : '打开导航'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </div>

      <button
        className={`nav-backdrop ${open ? 'nav-backdrop--open' : ''}`}
        type="button"
        aria-label="关闭导航"
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
