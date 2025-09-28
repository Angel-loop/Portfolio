import React from 'react';
import '@/app/globals.css';
import Image from 'next/image';
import A1 from '@/app/assets/a1.jpg';
import A2 from '@/app/assets/a2.jpg';

function About() { 
  return (
    <div className='aboutContainer'>
      <div className='separador'></div>
     <section>
       <Image
               src={A1}
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
               src={A2}
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