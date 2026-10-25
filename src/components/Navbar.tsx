import './navbar.scss';
import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="AKETI home">AKETI<span>®</span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        <a href="#services" onClick={closeMenu}>Services <span>01</span></a>
        <a href="#work" onClick={closeMenu}>Work <span>02</span></a>
        <a href="#approach" onClick={closeMenu}>How we work <span>03</span></a>
        <a href="#contact" onClick={closeMenu}>Contact <span>04</span></a>
      </nav>
      <a className="header-cta" href="#contact">Let's Discuss the problem <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}
