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
        <div className='Info_Block'>
          <h1>PlaceHolder </h1>
          <h1>Text</h1>
        </div>
          
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus harum maiores quisquam 
            in fuga officiis quam cupiditate nobis expedita? Eveniet quia nam delectus magnam 
            sapiente amet optio facilis, tempora labore!
          </p>
      </div>
    
     </section>
     <section>
      <div>
        <div className='Info_Block'>
          <h1>PlaceHolder </h1>
          <h1>Text</h1>
        </div>
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