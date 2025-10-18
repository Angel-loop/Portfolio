'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function ImageCard({children, imgSrc, props}:any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      {...props}
      className={isOpen ? 'img-wrapper-open' : 'gallery-img'}
      onClick={handleClick}
    >
      {isOpen ? (
        // Vista expandida (modal)
        <div className='img-wrapper'>
          <Image
            src={imgSrc}
            alt=''
            className='full-img'
          />
          <div className='full-text'>
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