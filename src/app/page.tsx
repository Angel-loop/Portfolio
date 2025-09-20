import Image from "next/image";
import NavBar  from "./components/navBar.module.";
import Contact from "./components/contact";
import React from "react";

export default function Home() {
  return (
    <div >
      {/* <NavBar/> */}
      <Contact/>
    </div>
  );
}
