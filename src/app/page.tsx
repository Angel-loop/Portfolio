import "@/app/globals.css"
import NavBar  from "./components/navBar.module.";
import Contact from "./components/contact";
import Gallery from "./components/gallery";
import React from "react";

export default function Home() {
  return (
    <div className="home-container">
      {/* <NavBar/> */}
      <Gallery/>
      <Contact/>
    </div>
  );
}
