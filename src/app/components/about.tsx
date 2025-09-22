import React from 'react'
import '../styles/About.css' 
import Image from 'next/image'
import Miimagen from '../../../public/next.svg'

function About() { 
  return (
    <div className='aboutContainer'>
      <div className='separador'></div>
     <section>
       <Image
               src={Miimagen}
               width={600}
               height={1000}
               className='hidden md:block'
               alt='Image for the landing page'
             />
      <div className='right_align'>
          <h1>PlaceHolder Text</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus harum maiores quisquam 
            in fuga officiis quam cupiditate nobis expedita? Eveniet quia nam delectus magnam 
            sapiente amet optio facilis, tempora labore!
          </p>
      </div>
    
     </section>
     <section>
      <div>
          <h1>PlaceHolder Text</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus harum maiores quisquam 
            in fuga officiis quam cupiditate nobis expedita? Eveniet quia nam delectus magnam 
            sapiente amet optio facilis, tempora labore!
          </p>
      </div>
         <Image
               src={Miimagen}
               width={600}
               height={1000}
               className='hidden md:block'
               alt='Image for the landing page'
             />
    
     </section>
    </div>
  )
}

export default About; 