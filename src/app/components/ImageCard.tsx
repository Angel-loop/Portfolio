'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

export default function ImageCard({children, imgSrc, props}:any) {
  const [isOpen, setIsOpen] = useState(false);
  const [animationStage, setAnimationStage] = useState('closed');
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isOpen && animationStage === 'closed') {
      setAnimationStage('opening');
      setIsOpen(true);
    } else if (isOpen && animationStage === 'open') {
      setAnimationStage('closing');
    }
  };

  // Manejar las transiciones de animación y el scroll
  useEffect(() => {
    if (animationStage === 'opening') {
      // Centrar el modal en la vista cuando se abre
      const timer = setTimeout(() => {
        setAnimationStage('open');
        // Centrar el scroll en el modal después de que comience la animación
        if (modalRef.current) {
          modalRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'center'
          });
        }
      }, 100); // Reducido para que el scroll ocurra más temprano
      return () => clearTimeout(timer);
    } else if (animationStage === 'closing') {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setAnimationStage('closed');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  // Efecto adicional para manejar el scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen && animationStage === 'open') {
      // Asegurarse de que el modal esté centrado
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'center'
          });
        }
      }, 50);
    }
  }, [isOpen, animationStage]);

  return (
    <div
      {...props}
      className={isOpen ? 'img-wrapper-open' : 'gallery-img'}
      onClick={handleClick}
      ref={containerRef}
    >
      {isOpen ? (
        // Vista expandida (modal) con animación
        <div 
          className={`img-wrapper ${animationStage}`}
          ref={modalRef}
        >
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