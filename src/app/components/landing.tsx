'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Miimagen from '../../../public/next.svg'
import '@/app/globals.css' 
import { collectRoutesUsingEdgeRuntime } from 'next/dist/build/utils'
import NavBar from "../components/navBar";
import gsap from 'gsap'

function Landing() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleSpanRef = useRef<HTMLSpanElement>(null);
  const subtitleSpanRef = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);
  const isHovered = useRef(false);
  const pendingAnimation = useRef<'enter' | 'leave' | null>(null);
  const originalSubtitleText = useRef<string>('');

  useEffect(() => {
    // Animación inicial
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo([titleRef.current, subtitleRef.current], 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.3, ease: "power3.out" }
      );
    }

    // Efectos hover más elaborados
    const setupHoverEffects = () => {
      const titleElement = titleSpanRef.current;
      const subtitleElement = subtitleSpanRef.current;

      if (!titleElement || !subtitleElement) return;

      // Guardar el texto original
      originalSubtitleText.current = subtitleElement.innerHTML;

      // Título principal - Efecto magnético
      const handleTitleEnter = () => {
        const tl = gsap.timeline();
        tl.to(titleElement, {
          scale: 1.05,
          y: -5,
          rotationY: 10,
          color: '#ffffff',
          duration: 0.4,
          ease: "power2.out"
        })
        .to(titleElement, {
          rotationY: 0,
          duration: 0.2,
          ease: "power2.inOut"
        }, "-=0.1");
      };

      const handleTitleLeave = () => {
        gsap.to(titleElement, {
          scale: 1,
          y: 0,
          rotationY: 0,
          color: 'var(--primary)',
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      };

      // Función para reiniciar el texto
      const resetSubtitleText = () => {
        gsap.to(subtitleElement, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            subtitleElement.innerHTML = originalSubtitleText.current;
            gsap.to(subtitleElement, {
              opacity: 1,
              duration: 0.3,
              onComplete: () => {
                isAnimating.current = false;
                // Procesar animación pendiente si existe
                processPendingAnimation();
              }
            });
          }
        });
      };

      // Función para procesar animaciones pendientes
      const processPendingAnimation = () => {
        if (pendingAnimation.current && !isAnimating.current) {
          const pending = pendingAnimation.current;
          pendingAnimation.current = null;
          
          if (pending === 'enter' && isHovered.current) {
            executeSubtitleEnter();
          } else if (pending === 'leave' && !isHovered.current) {
            executeSubtitleLeave();
          }
        }
      };

      // Ejecutar animación de entrada (sin verificación de isAnimating)
      const executeSubtitleEnter = () => {
        isAnimating.current = true;

        const text = subtitleElement.textContent || '';
        
        // Crear spans manteniendo TODOS los caracteres incluyendo comas, puntos, etc.
        const newHTML = text.split('').map(char => {
          if (char === ' ') {
            return '<span class="char space">&nbsp;</span>';
          } else if (char === '\u00A0') {
            return '<span class="char nbsp">&nbsp;</span>';
          } else {
            return `<span class="char">${char}</span>`;
          }
        }).join('');

        subtitleElement.innerHTML = newHTML;

        // Obtener todos los caracteres después de crear el HTML
        const chars = subtitleElement.querySelectorAll('.char');
        
        // Animación de entrada de los caracteres
        gsap.fromTo(chars,
          {
            y: 0,
            color: 'var(--secondary)',
          },
          {
            y: -8,
            color: '#ffffff',
            stagger: 0.02,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              isAnimating.current = false;
              // Procesar animación pendiente si existe
              processPendingAnimation();
            }
          }
        );
      };

      // Ejecutar animación de salida (sin verificación de isAnimating)
      const executeSubtitleLeave = () => {
        isAnimating.current = true;

        // Obtener los caracteres actuales
        const chars = subtitleElement.querySelectorAll('.char');
        
        if (chars.length === 0) {
          isAnimating.current = false;
          processPendingAnimation();
          return;
        }

        // Animación de salida suave y progresiva
        gsap.to(chars, {
          y: 0,
          color: 'var(--secondary)',
          stagger: 0.01,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            // Verificar si el mouse volvió a entrar durante la animación
            setTimeout(() => {
              if (!isHovered.current) {
                // Solo reiniciar si no estamos en hover
                resetSubtitleText();
              } else {
                // Si volvió a entrar en hover, mantener el estado actual
                isAnimating.current = false;
                processPendingAnimation();
              }
            }, 50);
          }
        });
      };

      // Subtítulo - Efecto onda de caracteres MEJORADO
      const handleSubtitleEnter = () => {
        isHovered.current = true;
        
        if (isAnimating.current) {
          // Si ya está animando, guardar como pendiente
          pendingAnimation.current = 'enter';
          return;
        }
        
        executeSubtitleEnter();
      };

      const handleSubtitleLeave = () => {
        isHovered.current = false;
        
        if (isAnimating.current) {
          // Si ya está animando, guardar como pendiente
          pendingAnimation.current = 'leave';
          return;
        }

        executeSubtitleLeave();
      };

      // Agregar event listeners
      titleElement.addEventListener('mouseenter', handleTitleEnter);
      titleElement.addEventListener('mouseleave', handleTitleLeave);
      subtitleElement.addEventListener('mouseenter', handleSubtitleEnter);
      subtitleElement.addEventListener('mouseleave', handleSubtitleLeave);

      // Cleanup function
      return () => {
        titleElement.removeEventListener('mouseenter', handleTitleEnter);
        titleElement.removeEventListener('mouseleave', handleTitleLeave);
        subtitleElement.removeEventListener('mouseenter', handleSubtitleEnter);
        subtitleElement.removeEventListener('mouseleave', handleSubtitleLeave);
      };
    };

    // Delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(() => {
      setupHoverEffects();
    }, 100);

    // Return cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className='landing_fondo'> 
      <NavBar/>
      <div className='landing'>
        <section className='Titulo'>
          <h1 ref={titleRef}>
            <span ref={titleSpanRef} className='hover-magnetic'>
              Portfolio 2025
            </span>
          </h1>
          <h3 ref={subtitleRef}> 
            <span ref={subtitleSpanRef} className='hover-wave'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </span>
          </h3>
        </section>
      </div>
    </div>
  );
}

export default Landing;