"use client"
import "@/app/globals.css"
import NavBar from "./components/navBar";
import Contact from "./components/contact";
import Gallery from "./components/gallery";
import Landing from "./components/landing";
import About from "./components/about";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("Home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const componentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Control de scroll basado en el componente activo
  useEffect(() => {
    const handleScrollControl = () => {
      // Permitir scroll en componentes que necesitan desplazamiento
      const scrollableComponents = ["About", "Portfolio", "Contact"];
      
      if (scrollableComponents.includes(currentSection) && !isTransitioning) {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
      } else {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
      }
    };

    handleScrollControl();
  }, [currentSection, isTransitioning]);

  // Referencias para los componentes
  const setComponentRef = (sectionId: string) => (el: HTMLDivElement | null) => {
    componentRefs.current[sectionId] = el;
  };

  // Función para navegar con efectos de transición espectaculares
  const handleNavigate = async (sectionId: string) => {
    if (sectionId === currentSection || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Deshabilitar scroll durante la transición
    document.body.style.overflow = "hidden";
    
    const currentComponent = componentRefs.current[currentSection];
    const targetComponent = componentRefs.current[sectionId];

    // 1. ANIMACIÓN DE SALIDA - Efecto de "desarme" con partículas
    if (currentComponent) {
      const exitTimeline = gsap.timeline();
      
      // Efecto principal de desvanecimiento y desmontaje
      exitTimeline.to(currentComponent, {
        opacity: 0,
        scale: 0.8,
        rotationY: 15,
        duration: 0.8,
        ease: "power2.inOut"
      });

      // Efecto de partículas en elementos hijos
      const childElements = currentComponent.querySelectorAll('*:not(script, style)');
      exitTimeline.to(childElements, {
        x: () => gsap.utils.random(-150, 150),
        y: () => gsap.utils.random(-100, 100),
        rotation: () => gsap.utils.random(-20, 20),
        opacity: 0,
        scale: () => gsap.utils.random(0.3, 0.7),
        duration: 1,
        stagger: {
          amount: 0.6,
          from: "random"
        },
        ease: "power2.out"
      }, "-=0.6");

      // Efecto de blur y distorsión final
      exitTimeline.to(currentComponent, {
        filter: "blur(20px) brightness(0.8)",
        duration: 0.4,
        ease: "power2.in"
      });
    }

    // Pequeña pausa dramática
    await new Promise(resolve => setTimeout(resolve, 300));

    // 2. CAMBIO DE COMPONENTE
    setCurrentSection(sectionId);

    // Scroll al inicio del componente
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Pequeño delay para asegurar que el DOM se actualice
    await new Promise(resolve => setTimeout(resolve, 50));

    // 3. ANIMACIÓN DE ENTRADA - Efecto de "armado" espectacular
    if (targetComponent) {
      // Preparar estado inicial con elementos dispersos
      const targetChildElements = targetComponent.querySelectorAll('*:not(script, style)');
      
      gsap.set(targetComponent, {
        opacity: 0,
        scale: 1.2,
        rotationY: -15
      });

      gsap.set(targetChildElements, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-200, 200),
        rotation: () => gsap.utils.random(-45, 45),
        opacity: 0,
        scale: () => gsap.utils.random(0.2, 0.5)
      });

      const enterTimeline = gsap.timeline();

      // Entrada del contenedor principal
      enterTimeline.to(targetComponent, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1.2, 0.8)"
      });

      // Animación de "armado" de elementos hijos
      enterTimeline.to(targetChildElements, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "random"
        },
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Efectos especiales finales
      enterTimeline.to(targetComponent, {
        filter: "blur(0px) brightness(1)",
        duration: 0.3,
        ease: "power2.out"
      });

      // Resplandor final
      enterTimeline.fromTo(targetComponent,
        { boxShadow: "0 0 0 0 rgba(125, 79, 197, 0)" },
        { 
          boxShadow: "0 0 40px 10px rgba(125, 79, 197, 0.4)",
          duration: 0.5,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut"
        }
      );
    }

    // Finalizar transición y restaurar scroll si es necesario
    setTimeout(() => {
      setIsTransitioning(false);
      
      // Permitir scroll en componentes que lo necesitan
      const scrollableComponents = ["About", "Portfolio", "Contact"];
      if (scrollableComponents.includes(sectionId)) {
        document.body.style.overflow = "auto";
        document.body.style.height = "auto";
      }
    }, 500);
  };

  // Renderizar componentes con referencias
  const renderComponent = (sectionId: string, Component: React.ComponentType) => {
    const isActive = currentSection === sectionId;
    
    return (
      <div
        ref={setComponentRef(sectionId)}
        className={`component-wrapper ${isActive ? 'active' : 'hidden'}`}
        style={{
          position: isActive ? 'relative' : 'absolute',
          minHeight: isActive ? 'auto' : '100vh'
        }}
      >
        <Component />
      </div>
    );
  };

  return (
    <div className="home-container" ref={containerRef}>
      <NavBar onNavigate={handleNavigate} currentSection={currentSection} />
      
      <div className={`components-container ${isTransitioning ? 'transitioning' : ''}`}>
        {renderComponent("Home", Landing)}
        {renderComponent("About", About)}
        {renderComponent("Portfolio", Gallery)}
        {renderComponent("Contact", Contact)}
      </div>

      {/* ELIMINADO: Overlay de transición con spinner */}
      {/* {isTransitioning && (
        <div className="transition-overlay">
          <div className="transition-spinner"></div>
        </div>
      )} */}
    </div>
  );
}