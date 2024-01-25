import { RxDownload, RxGithubLogo } from "react-icons/rx";
import { Routes, Route } from "react-router-dom";

import Layout from "./assets/pages/Layout"
import Login from "./assets/pages/Login";


import logoImage from './assets/images/loro.png';
import Parrot5 from './assets/images/parrot5.png';
import lorito from './assets/images/lorito.png';
import movil from './assets/images/movil.png';
import movil2 from './assets/images/movil2.png';
import parrot8 from './assets/images/parrot8.png';
import capa from './assets/images/capa.png';
import Not_found from "./assets/pages/Not_found";


function App() {
  return (
    <>
      <div className="bg-[#FAF0E2] min-h-screen">
        <div className="navbar bg-[#5894ad] text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>About us</a></li>
                <li><a>ParrotLine Web</a></li>
                <li><a>Privacy</a></li>
              </ul>
            </div>
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="Logo" className="h-14 w-14 mr-1" />
              <a className="text-4xl">PARROTLITE</a>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1  space-x-20">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/Login" element={<Login />} />
                </Route>
                <Route path="*" element={<Not_found />} />
              </Routes>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn border-none hover:bg-[#47af90] hover:scale-[103%] transition-all text-xl bg-[#47af90] text-white">
              Download
              <RxDownload size={27} />
            </button>
          </div>
        </div>
        
        <div className="container mx-auto my-5 text-black">
          <div className="flex items-center">
            <div className="border-l-4 border-[#47af90] pl-4">
              <p className="text-5xl mb-5">
                Connect instantly,
              </p>
              <p className="text-5xl mb-6 ml-5 text-black">
                Communicate without limits.
              </p>
            </div>

            <div className="flex-shrink-0 ml-auto">
              <img src={lorito} alt="Imagen 2" className="w-40 h-auto ml-12" style={{ transform: 'scaleX(-1)' }} />
              <img src={Parrot5} alt="Imagen 1" className="w-96 h-auto ml-[-120px]" />
            </div>
          </div>

          <div className="text-center my-40">
            <div className="inline-block">
              <p className="text-5xl mb-4">Connect from anywhere any time.</p>
              <div className="left-0 right-0 mx-auto w-30 h-2 bg-[#47af90]"></div>
            </div>

            <div className="flex-shrink-0 flex-col items-center my-20 sm:flex-row sm:justify-center">
              <img src={movil2} alt="Imagen 4" className="w-96 h-auto mb-4 sm:mb-0 mx-auto sm:mr-96" style={{ transform: 'scaleX(-1)' }} />
              <img src={movil} alt="Imagen 3" className="w-96 h-auto mx-auto  sm:order-last" />
            </div>
          </div>

          <div className="text-center my-40">
            <div className="inline-block">
              <p className="text-5xl mb-4">Discover a new way to Communicate.</p>
              <div className="left-0 right-0 mx-auto w-30 h-2 bg-[#47af90]"></div>
            </div>

            <div className="flex-shrink-0 flex items-center my-40 sm:flex-row sm:justify-center">
              <img src={capa} alt="Imagen 3" className="w-64 md:w-96 h-auto mx-2" />
              <img src={parrot8} alt="Imagen 4" className="w-64 md:w-96 h-auto mx-2" />
            </div>

          </div>

        </div>




        <footer className="footer items-center p-4 bg-neutral text-neutral-content">
          <aside className="flex items-center space-x-3">
            <img src={logoImage} alt="Logo" className="h-14 w-14 mr-1" />
            <a className="text-4xl">PARROTLITE</a>
            <button className="btn border-none hover:bg-[#47af90] hover:scale-[103%] transition-all text-xl bg-[#47af90] text-white ml-4">
              Download
              <RxDownload size={27} />
            </button>
          </aside>
          <aside>
            <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
          </aside>
          <aside>
            <p>Project Created by: Yeray Santana Curbelo and Iván Dasilva Martín</p>
          </aside>
          <aside>
            <a href="http://">Accesibility</a>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a href="https://github.com/GGamingESP/ParrotLine-front"><RxGithubLogo size={30} />FRONT</a>
            <a href="https://github.com/GGamingESP/ParrotLine-back"><RxGithubLogo size={30} />BACK</a>
          </nav>
        </footer>
      </div>
    </>
  )
}

export default App
