import Image from "next/image";
import NavBar  from "./components/navBar.module.";
import Landing from "./components/landing.module"
import About from "./components/about.module"

export default function Home() {
  return (
    <div >
      
      <Landing/>
      <About/>

    </div>
  );
}
