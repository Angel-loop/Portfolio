import '@/app/globals.css'
import Image from 'next/image'

import g1 from '@/app/assets/gallery/g1.jpg'
import g2 from '@/app/assets/gallery/g2.jpg'
import g3 from '@/app/assets/gallery/g3.jpg'
import g4 from '@/app/assets/gallery/g4.jpg'
import g5 from '@/app/assets/gallery/g5.jpg'
import g6 from '@/app/assets/gallery/g6.jpg'

export default function gallery() {
  
  
    return (
      <div>
        <div className="gallery-title">
          <h2>My Work</h2>
          <hr />
        </div>

        <div className="gallery-container">
        

        <Image
        src={g1}
        alt=''
       className='gallery-img'
        />

        <Image
        src={g2}
        alt=''
        className='gallery-img'
        />

        <Image
        src={g3}
        alt=''
        className='gallery-img'
        />

        <Image
        src={g4}
        alt=''
        className='gallery-img'
        />

        <Image
        src={g5}
        alt=''
        className='gallery-img'
        />

        <Image
        src={g6}
        alt=''
        className='gallery-img'
        />

    </div>
      </div>

  )
}
