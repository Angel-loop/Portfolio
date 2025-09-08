import React from 'react';
import '../styles/NavBar.css'; 
import { Agu_Display } from 'next/font/google';

function NavBar() {
    return (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <div className='navContainer'>
             {/* Usa className en lugar de class */}
            <button>Home</button>
            <button>About</button>
            <button>Contact</button>
            <button>Portfolio</button>
          </div> 
           
        </div>
    );
}

export default NavBar;