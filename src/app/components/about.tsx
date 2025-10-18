import React, { useEffect, useRef } from 'react';
import '@/app/globals.css';
import Image from 'next/image';
import A1 from '@/app/assets/a1.jpg';
import A2 from '@/app/assets/a2.jpg';
import { gsap } from 'gsap';

function About() { 
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);

  useEffect(() => {
    // Animación para la primera imagen
    gsap.to(image1Ref.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Animación para la segunda imagen (con offset para que no estén sincronizadas)
    gsap.to(image2Ref.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
  }, []);

  return (
    <div className='aboutContainer'>
      <div className='separador'></div>
     <section>
       <div ref={image1Ref}>
         <Image
           src={A1}
           className='about-image'
           alt='Image for the about section'
           width={500}
           height={600}
         />
       </div>
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
         <div ref={image2Ref}>
           <Image
             src={A2}
             className='about-image'
             alt='Image for the about section'
             width={500}
             height={600}
           />
         </div>
    
     </section>
    </div>
  )
}

export default About;