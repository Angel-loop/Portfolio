'use client';
import React, { useState, useEffect } from 'react';
import '../styles/NavBar.css';

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Función para manejar el scroll suave
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Controlador del scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Bajando y hemos pasado los 100px - ocultar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Subiendo - mostrar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Agregar el event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpiar el event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div style={{display:'flex',justifyContent:'flex-end'}}>
      <ul className={`navContainer ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <li><button onClick={() => handleScrollTo('Home')}>Home</button></li>  
        <li><button onClick={() => handleScrollTo('About')}>About</button></li>
        <li><button onClick={() => handleScrollTo('Portfolio')}>Portfolio</button></li>
        <li><button onClick={() => handleScrollTo('Contact')}>Contact</button></li>
      </ul> 
    </div>
  );
}

export default NavBar;