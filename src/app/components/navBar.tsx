'use client'; // ¡AGREGA ESTA LÍNEA!
import React from 'react';
import '../styles/NavBar.css'; 
import { Agu_Display } from 'next/font/google';
function NavBar() {
  
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

  
  return (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <ul className='navContainer'>
          <li><button onClick={() => handleScrollTo('Home')}>Home</button></li>  
          <li><button  onClick={() => handleScrollTo('About')}>About</button></li>
          <li><button   onClick={() => handleScrollTo('Portfolio')}>Portfolio</button></li>
          <li><button   onClick={() => handleScrollTo('Contact')}>Contact</button></li>
          </ul> 
           
        </div>
    );
}

export default NavBar;