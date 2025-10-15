'use client'
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
  currentSection: string;
}

function NavBar({ onNavigate, currentSection }: NavBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
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

  return (
    <nav className={`navContainer ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
      <div className='nav_logo'>
        {/* <h1>Logo</h1> */}
      </div>
      <div className='nav_items'>
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
    </nav>
  );
}

export default NavBar;