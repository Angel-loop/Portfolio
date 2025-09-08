import Image from "next/image";
import NavBar  from "./components/navBar.module.";
import Landing from "./components/landing.module"

export default function Home() {
  return (
    <div >
      <NavBar/>
      <Landing/>
    </div>
  );
}
