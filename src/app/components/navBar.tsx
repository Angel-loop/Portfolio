'use client';
import React, { useState, useEffect, useRef } from 'react';
import '@/app/globals.css'; 

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [textColor, setTextColor] = useState('light'); // 'light' o 'dark'
  const navRef = useRef<HTMLElement>(null);

  // Función para detectar el color de fondo
  const detectBackgroundColor = () => {
    if (!navRef.current) return;

    // Obtener la posición del navbar
    const navRect = navRef.current.getBoundingClientRect();
    const centerX = navRect.left + navRect.width / 2;
    const centerY = navRect.top + navRect.height / 2;

    // Obtener el elemento en esa posición
    const elementBelow = document.elementFromPoint(centerX, centerY);
    
    if (elementBelow && elementBelow !== navRef.current) {
      // Obtener el color de fondo del elemento
      const backgroundColor = getComputedStyle(elementBelow).backgroundColor;
      
      // Convertir RGB a luminosidad para determinar si es claro u oscuro
      const luminance = getLuminance(backgroundColor);
      
      // Si la luminosidad es mayor a 0.5, es un fondo claro
      if (luminance > 0.5) {
        setTextColor('dark');
      } else {
        setTextColor('light');
      }
    }
  };

  // Función para calcular luminosidad de un color RGB
  const getLuminance = (rgb: string) => {
    // Extraer valores RGB del string
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return 0.5;

    const r = parseInt(rgbValues[0]) / 255;
    const g = parseInt(rgbValues[1]) / 255;
    const b = parseInt(rgbValues[2]) / 255;

    // Fórmula de luminosidad relativa (WCAG)
    const rSRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const gSRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const bSRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * rSRGB + 0.7152 * gSRGB + 0.0722 * bSRGB;
  };

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

  // Controlador del scroll mejorado
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Bajando y hemos pasado los 100px - ocultar con transición
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Subiendo - mostrar inmediatamente
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Agregar el event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpiar el event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Detectar color de fondo cuando cambia la visibilidad o el scroll
  useEffect(() => {
    if (isVisible) {
      // Pequeño delay para asegurar que el navbar esté en su posición
      setTimeout(() => {
        detectBackgroundColor();
      }, 100);
    }
  }, [isVisible, lastScrollY]);

  // Detectar cambios de color al redimensionar la ventana
  useEffect(() => {
    const handleResize = () => {
      detectBackgroundColor();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`navContainer ${isVisible ? 'nav-visible' : 'nav-hidden'} ${textColor === 'dark' ? 'nav-dark-text' : 'nav-light-text'}`}
    >
      <ul>
        <li><button onClick={() => handleScrollTo('Home')}>Home</button></li>  
        <li><button onClick={() => handleScrollTo('About')}>About</button></li>
        <li><button onClick={() => handleScrollTo('Portfolio')}>Portfolio</button></li>
        <li><button onClick={() => handleScrollTo('Contact')}>Contact</button></li>
      </ul> 
    </nav>
  );
}

export default NavBar;