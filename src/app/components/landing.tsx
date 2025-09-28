import React from 'react'
import Image from 'next/image'
import Miimagen from '../../../public/next.svg'
import '@/app/globals.css' 
import { collectRoutesUsingEdgeRuntime } from 'next/dist/build/utils'
import NavBar  from "../components/navBar";

function Landing() { // Cambiado a PascalCase
  return (
    <div className='landing_fondo'> 
      <NavBar/>
      <div className='landing'>
        <section className='Titulo'>
          <h1><span className='color-effect'>Portfolio 2025</span></h1>
          <h3> 
            <span className='color-effect'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
          </h3>
        </section>
      </div>
    </div> // Cerrado correctamente el div principal
  );
}

export default Landing; // Exportación corregida

