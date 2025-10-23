'use client'
import React, { useState, useEffect, useRef } from 'react';
import '@/app/globals.css';

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

function NavBar({ onNavigate, currentSection }: NavBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar inicialmente
    checkMobile();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMenuOpen(false);
  };

  // Controlar visibilidad de la navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Cerrar menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className={`navContainer ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <div className='nav_logo'>
          {/* <h1>Logo</h1> */}
        </div>
        
        {/* Menú desktop - visible solo en pantallas grandes */}
        <div className='nav_items' style={{ display: isMobile ? 'none' : 'flex' }}>
          {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
            <button
              key={item}
              className={`nav_item ${currentSection === item ? 'nav-active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Botón hamburguesa para mobile */}
        <button 
          className="nav_item"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          style={{ 
            display: isMobile ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2rem',
            height: '2rem',
            background: 'transparent',
            gap: '0.25rem'
          }}
        >
          <span style={{
            width: '1.5rem',
            height: '0.125rem',
            backgroundColor: 'var(--primary)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translate(0.25rem, 0.25rem)' : 'none'
          }} />
          <span style={{
            width: '1.5rem',
            height: '0.125rem',
            backgroundColor: 'var(--primary)',
            transition: 'all 0.3s ease',
            opacity: menuOpen ? '0' : '1'
          }} />
          <span style={{
            width: '1.5rem',
            height: '0.125rem',
            backgroundColor: 'var(--primary)',
            transition: 'all 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translate(0.25rem, -0.25rem)' : 'none'
          }} />
        </button>
      </nav>

      {/* Panel del menú móvil */}
      <div 
        ref={panelRef}
        className="transition-overlay"
        style={{
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'all 0.3s ease',
          background: 'rgba(15, 8, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingTop: '6rem',
          display: isMobile ? 'flex' : 'none'
        }}
      >
        <button 
          className="close-button"
          onClick={toggleMenu}
          style={{
            top: '1rem',
            right: '1rem'
          }}
        >
          ×
        </button>
        
        <div 
          ref={menuRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            padding: '2rem',
            gap: '2rem'
          }}
        >
          {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
            <button
              key={item}
              className={`nav_item ${currentSection === item ? 'nav-active' : ''}`}
              onClick={() => handleNavClick(item)}
              style={{
                fontSize: '2.5rem',
                padding: '1rem 2rem',
                color: 'var(--background)',
                border: '2px solid transparent',
                width: '100%',
                maxWidth: '300px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default NavBar;