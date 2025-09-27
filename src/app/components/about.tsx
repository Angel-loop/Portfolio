import React from 'react';
import '@/app/globals.css';
import Image from 'next/image';
import A1 from '@/app/assets/a1.jpg';
import A2 from '@/app/assets/a2.jpg';

function About() { 
  return (
    <div className='aboutContainer'>
     <section>
       <Image
               src={A1}
               className='hidden md:block'
               alt='Image for the landing page'
             />
      <div>
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