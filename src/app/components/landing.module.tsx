import React from 'react'
import Image from 'next/image'
import Miimagen from '../../../public/next.svg'
import '../styles/Landing.css' 
import { collectRoutesUsingEdgeRuntime } from 'next/dist/build/utils'

function landing() {
  return (
    <div className='landing'>
       <Image
         src={Miimagen}
         width={650}
         height={1000}
         className='hidden md:block'
         alt='Image for the landing page'
       />
       <section className='Titulo'>
          <h1 > Portfolio 2025 </h1>

          <h3> 
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Inventore recusandae a, tempora voluptate dolor quos expedita nemo voluptatem 
            quisquam distinctio consectetur saepe praesentium,
            ipsam corrupti vero? Deserunt culpa velit aperiam.
          </h3>
       </section>
      

    </div>
  )
}

export default landing