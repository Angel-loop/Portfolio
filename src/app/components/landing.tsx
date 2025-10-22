'use client'
import React, { useRef, useEffect } from 'react'
import '@/app/globals.css' 
import gsap from 'gsap'

function Landing() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleSpan1Ref = useRef<HTMLSpanElement>(null);
  const titleSpan2Ref = useRef<HTMLSpanElement>(null);
  const subtitleSpanRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const isHovered = useRef(false);
  const pendingAnimation = useRef<'enter' | 'leave' | null>(null);
  const originalSubtitleText = useRef<string>('');

  useEffect(() => {
    // Animación inicial más elaborada para coincidir con las transiciones
    if (titleRef.current && subtitleRef.current && containerRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(containerRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      )
      .fromTo(titleRef.current, 
        { opacity: 0, y: 100, rotationX: 90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    // Efectos hover más elaborados
    const setupHoverEffects = () => {
      const titleElement1 = titleSpan1Ref.current;
      const titleElement2 = titleSpan2Ref.current;
      const subtitleElement = subtitleSpanRef.current;

      if (!titleElement1 || !titleElement2 || !subtitleElement) return;

      // Guardar el texto original
      originalSubtitleText.current = subtitleElement.innerHTML;

      // Título principal - Efecto magnético para AMBOS spans
      const handleTitleEnter = () => {
        const tl = gsap.timeline();
        tl.to([titleElement1, titleElement2], {
          scale: 1.05,
          y: -5,
          rotationY: 10,
          color: '#ffffff',
          duration: 0.4,
          ease: "power2.out"
        })
        .to([titleElement1, titleElement2], {
          rotationY: 0,
          duration: 0.2,
          ease: "power2.inOut"
        }, "-=0.1");
      };

      const handleTitleLeave = () => {
        gsap.to([titleElement1, titleElement2], {
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
            if (subtitleElement) {
              subtitleElement.innerHTML = originalSubtitleText.current;
              gsap.to(subtitleElement, {
                opacity: 1,
                duration: 0.3,
                onComplete: () => {
                  isAnimating.current = false;
                  processPendingAnimation();
                }
              });
            }
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

      // Ejecutar animación de entrada
      const executeSubtitleEnter = () => {
        isAnimating.current = true;

        if (!subtitleElement) return;

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
              processPendingAnimation();
            }
          }
        );
      };

      // Ejecutar animación de salida
      const executeSubtitleLeave = () => {
        isAnimating.current = true;

        if (!subtitleElement) return;

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

      // Subtítulo - Efecto onda de caracteres
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

      // Agregar event listeners a AMBOS spans del título
      if (titleElement1 && titleElement2) {
        // Crear un contenedor virtual para manejar el hover de ambos spans
        const titleContainer = document.createElement('div');
        titleContainer.style.display = 'contents'; // No afecta el layout
        
        // Agregar listeners a ambos spans individualmente
        [titleElement1, titleElement2].forEach(element => {
          element.addEventListener('mouseenter', handleTitleEnter);
          element.addEventListener('mouseleave', handleTitleLeave);
        });
      }

      if (subtitleElement) {
        subtitleElement.addEventListener('mouseenter', handleSubtitleEnter);
        subtitleElement.addEventListener('mouseleave', handleSubtitleLeave);
      }

      // Cleanup function
      return () => {
        if (titleElement1 && titleElement2) {
          [titleElement1, titleElement2].forEach(element => {
            element.removeEventListener('mouseenter', handleTitleEnter);
            element.removeEventListener('mouseleave', handleTitleLeave);
          });
        }
        if (subtitleElement) {
          subtitleElement.removeEventListener('mouseenter', handleSubtitleEnter);
          subtitleElement.removeEventListener('mouseleave', handleSubtitleLeave);
        }
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
    <div className='landing_fondo' ref={containerRef}> 
      {/* NavBar removido de aquí - ahora está en page.tsx */}
      <div className='landing'>
        <section className='Titulo'>
          <h1 ref={titleRef}>
            <span ref={titleSpan1Ref} className='hover-magnetic'>
              Portfolio 
            </span>
            {''}
            <span ref={titleSpan2Ref} className='hover-magnetic color-effect'>
              2025
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