import React from 'react'
import Image from 'next/image'
import Miimagen from '../../../public/next.svg'
import '../styles/Landing.css' 
import { collectRoutesUsingEdgeRuntime } from 'next/dist/build/utils'
import NavBar  from "../components/navBar";

function Landing() { // Cambiado a PascalCase
  return (
    <div className='landing_fondo'> {/* Corregida la sintaxis de style */}
      <NavBar/>
      <div className='landing'>
        <Image
          src={Miimagen}
          width={600}
          height={1000}
          className='hidden md:block'
          alt='Image for the landing page'
        />
        <section className='Titulo'>
          <h1>Portfolio 2025</h1>
          <h3> 
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Inventore recusandae a, tempora voluptate dolor quos expedita nemo voluptatem 
            quisquam distinctio consectetur saepe praesentium,
            ipsam corrupti vero? Deserunt culpa velit aperiam.
          </h3>
        </section>
      </div>
    </div> // Cerrado correctamente el div principal
  );
}

export default Landing; // Exportación corregida

