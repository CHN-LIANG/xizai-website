import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/siteData.js';
import TaiHexagramLogo from './TaiHexagramLogo.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a className="brand" href="/#home" aria-label="返回首页">
        <TaiHexagramLogo compact />
        <span>
          <strong>熙载咨询</strong>
          <small>县域产业与企业服务</small>
        </span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-label="打开导航"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>

      <button
        className={`nav-backdrop ${open ? 'nav-backdrop--open' : ''}`}
        type="button"
        aria-label="关闭导航"
        onClick={() => setOpen(false)}
      />

      <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="主导航">
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
