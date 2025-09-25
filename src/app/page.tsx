import "@/app/globals.css"
import NavBar  from "./components/navBar";
import Contact from "./components/contact";
import Gallery from "./components/gallery";
import Landing from "./components/landing"
import About from "./components/about"
import React from "react";


export default function Home() {
  return (
    <div className="home-container">
      <section id="Home">
       <Landing/>
      </section>
      <section id="About">
       <About/>
      </section>
      <section id="Portfolio">
        <Gallery/>
      </section>
      <section id="Contact">
       <Contact/>
      </section>
    </div>
  );
}
