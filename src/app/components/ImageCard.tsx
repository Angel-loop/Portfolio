'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'

export default function ImageCard({children, imgSrc, props}:any) {

  const [isOpen, setIsOpen] = useState(false);

  const ftext = useRef(null);
  const fimg = useRef(null);


  return (
    <div
    {...props}
    className={isOpen? '':'gallery-img'}
    onClick={()=> {

      let tElement = ftext.current;
      let iElement = fimg.current;

      if(!isOpen){
         // @ts-ignore
        iElement.classList.remove('out-left');
         // @ts-ignore
        tElement.classList.remove('out-right');
         // @ts-ignore
        iElement.classList.add('slide-left');
         // @ts-ignore
        tElement.classList.add('slide-right');

        setIsOpen(!isOpen)

      }else{
         // @ts-ignore
        iElement.classList.add('out-left');
         // @ts-ignore
        tElement.classList.add('out-right');
         // @ts-ignore
        iElement.classList.remove('slide-left');
         // @ts-ignore
        tElement.classList.remove('slide-right');
        
        setTimeout(()=>{setIsOpen(!isOpen)},250)
      }

    }}
    >
        <div className={isOpen? 'img-wrapper' : 'hidden'}>
          <Image
          src={imgSrc}
          alt=''
          className='full-img'
          ref={fimg}
          />

        <div className='full-text' ref={ftext}>
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
