
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './navbar.scss';

const navLinks = [
  { label: 'Our Services', href: '/#services' },
  { label: 'Previous Works', href: '/#work' },
  { label: 'How we work', href: '/#process' },
  { label: "Let's Connect", href: '/#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  function closeMenu() {
    setMenuOpen(false);
    setHoveredLink(null);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    }

    function handleResize() {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="/#home"
        aria-label="AKETI home"
        onClick={closeMenu}
      >
        AKETI
      </a>

      <nav
        id="primary-navigation"
        className={`nav ${menuOpen ? 'nav-open' : ''}`}
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            className={`nav-link ${
              hoveredLink === link.href ? 'is-hovered' : ''
            }`}
            href={link.href}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') {
                setHoveredLink(link.href);
              }
            }}
            onPointerLeave={() => {
              setHoveredLink(null);
            }}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}

        <a
          className="nav-mobile-cta"
          href="/#contact"
          onClick={closeMenu}
        >
          <span>Let's Discuss the problem</span>
          <ArrowUpRight size={18} />
        </a>
      </nav>

      <a
        className="header-cta"
        href="/#contact"
        onClick={closeMenu}
      >
        <span>Let's Discuss the problem</span>
        <ArrowUpRight size={16} />
      </a>

      <button
        className="menu-toggle"
        type="button"
        onClick={() => {
          setHoveredLink(null);
          setMenuOpen((open) => !open);
        }}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>
    </header>
  );
}
