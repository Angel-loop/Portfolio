import React from 'react'
import Image from 'next/image'

export default function ImageCard({children, imgSrc, props}) {
  return (
    <div
    {...props}
    className='gallery-img'>
        <Image
        src={imgSrc}
        alt=''
        className='image'
        />

        <div className='img-text'>
            <div>{children}</div>
        </div>


    </div>
  )
}
