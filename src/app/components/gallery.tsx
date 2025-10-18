'use client'

import '@/app/globals.css'
import { useEffect } from 'react'
import ImageCard from './ImageCard'

import g1 from '@/app/assets/gallery/g1.jpg'
import g2 from '@/app/assets/gallery/g2.jpg'
import g3 from '@/app/assets/gallery/g3.jpg'
import g4 from '@/app/assets/gallery/g4.jpg'
import g5 from '@/app/assets/gallery/g5.jpg'
import g6 from '@/app/assets/gallery/g6.jpg'

export default function Gallery() {
  
  // Reset all gallery images when component mounts
  useEffect(() => {
    const resetGalleryStyles = () => {
      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        const galleryImages = document.querySelectorAll('.gallery-img');
        galleryImages.forEach((img) => {
          // Force reset all inline styles that might be left by GSAP
          (img as HTMLElement).style.cssText = '';
          
          // Reset child elements too
          const childImage = img.querySelector('.gallery-image') as HTMLElement;
          const imgText = img.querySelector('.img-text') as HTMLElement;
          
          if (childImage) childImage.style.cssText = '';
          if (imgText) imgText.style.cssText = '';
        });
      }, 100);
    };

    resetGalleryStyles();
    
    // Also reset on window focus in case of any lingering states
    window.addEventListener('focus', resetGalleryStyles);
    return () => window.removeEventListener('focus', resetGalleryStyles);
  }, []);

  return (
    <div>
      <div className="gallery-title">
        <div className='separador'></div>
        <h2>My Work</h2>
        <hr />
      </div>

      <div className="gallery-container">
        <ImageCard imgSrc={g1}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nobis impedit, quos minus velit cum sequi. In perferendis incidunt id ab, magni totam ipsa quam eius magnam officia sunt. Corporis.</p>
        </ImageCard>

        <ImageCard imgSrc={g2}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nobis impedit, quos minus velit cum sequi. In perferendis incidunt id ab, magni totam ipsa quam eius magnam officia sunt. Corporis.</p>
        </ImageCard>

        <ImageCard imgSrc={g3}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nobis impedit, quos minus velit cum sequi. In perferendis incidunt id ab, magni totam ipsa quam eius magnam officia sunt. Corporis.</p>
        </ImageCard>

        <ImageCard imgSrc={g4}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nobis impedit, quos minus velit cum sequi. In perferendis incidunt id ab, magni totam ipsa quam eius magnam officia sunt. Corporis.</p>
        </ImageCard>

        <ImageCard imgSrc={g5}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nobis impedit, quos minus velit cum sequi. In perferendis incidunt id ab, magni totam ipsa quam eius magnam officia sunt. Corporis.</p>
        </ImageCard>

        <ImageCard imgSrc={g6}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam nobis impedit, quos minus velit cum sequi. In perferendis incidunt id ab, magni totam ipsa quam eius magnam officia sunt. Corporis.</p>
        </ImageCard>
      </div>
    </div>
  )
}