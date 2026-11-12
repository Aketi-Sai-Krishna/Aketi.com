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
      <a className="wordmark" href="/#home" aria-label="AKETI home" onClick={closeMenu}>
        AKETI
      </a>

      <nav
        className={menuOpen ? 'nav nav-open' : 'nav'}
        aria-label="Main navigation"
      >
        <a href="/#services" onClick={closeMenu}>
          Our Services
        </a>
        <a href="/#work" onClick={closeMenu}>
         Previous Works
        </a>
        <a href="/#process" onClick={closeMenu}>
          How we work
        </a>
        <a href="/#contact" onClick={closeMenu}>
          Let's Connect
        </a>
      </nav>

      <a className="header-cta" href="/#contact">
        Let's Discuss the problem <ArrowUpRight size={15} />
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

