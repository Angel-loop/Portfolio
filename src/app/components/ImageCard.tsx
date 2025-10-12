'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function ImageCard({children, imgSrc, props}:any) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
    {...props}
    className={isOpen? '':'gallery-img'}
    onClick={()=> {setIsOpen(!isOpen)}}
    >
        <div className={isOpen? 'img-wrapper' : 'hidden'}>
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


        <Image
        src={imgSrc}
        alt=''
        className={isOpen? '': ''}
        />

        <div className={isOpen? 'hidden':'img-text'}>
            <div>{children}</div>
        </div>


    </div>
  )
}
