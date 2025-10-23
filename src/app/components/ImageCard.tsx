'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageCard({children, imgSrc, props}:any) {
  const [isOpen, setIsOpen] = useState(false);
  const [animationStage, setAnimationStage] = useState('closed'); // 'closed', 'opening', 'open', 'closing'
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isOpen && animationStage === 'closed') {
      setAnimationStage('opening');
      setIsOpen(true);
    } else if (isOpen && animationStage === 'open') {
      setAnimationStage('closing');
    }
  };

  // Manejar las transiciones de animación
  useEffect(() => {
    if (animationStage === 'opening') {
      const timer = setTimeout(() => {
        setAnimationStage('open');
      }, 600); // Duración de la animación de entrada
      return () => clearTimeout(timer);
    } else if (animationStage === 'closing') {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setAnimationStage('closed');
      }, 500); // Duración de la animación de salida
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  return (
    <div
      {...props}
      className={isOpen ? 'img-wrapper-open' : 'gallery-img'}
      onClick={handleClick}
      ref={containerRef}
    >
      {isOpen ? (
        // Vista expandida (modal) con animación
        <div className={`img-wrapper ${animationStage}`}>
          <Image
            src={imgSrc}
            alt=''
            className={`full-img ${animationStage}`}
          />
          <div className={`full-text ${animationStage}`}>
            <h2>Type Of Work</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non recusandae facilis fugiat officia neque quas, praesentium ut commodi, laboriosam qui, distinctio assumenda. Consequuntur facere quae tempore assumenda ullam, sint eos!</p>
          </div>
        </div>
      ) : (
        // Vista normal de galería
        <>
          <Image
            src={imgSrc}
            alt=''
            className='gallery-image'
          />
          <div className='img-text'>
            <div>{children}</div>
          </div>
        </>
      )}
    </div>
  )
}