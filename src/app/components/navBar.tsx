import React from 'react';
import '@/app/globals.css'; 
import { Agu_Display } from 'next/font/google';

function NavBar() {
    return (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <ul className='navContainer'>
             {/* Usa className en lugar de class */}
          <li><button>Home</button></li>  
          <li><button>About</button></li>
          <li><button>Contact</button></li>
          <li><button>Portfolio</button></li>
          </ul> 
           
        </div>
    );
}

export default NavBar;