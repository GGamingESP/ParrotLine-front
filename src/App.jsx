
import Parrot5 from './assets/images/parrot5.webp';
import lorito from './assets/images/lorito.webp';
import movil from './assets/images/movil.webp';
import movil2 from './assets/images/movil2.webp';
import parrot8 from './assets/images/parrot8.webp';
import capa from './assets/images/capa.webp';

import Navbar from "./assets/pages/Navbar";
import Footer from './assets/pages/Footer';

function App() {
  return (
    <>
      <div className="bg-[#FAF0E2] min-h-screen">
        
        <Navbar />

        <div className="container mx-auto my-5 text-black">
          <div className="flex items-center">
            <div className="border-l-2 border-[#47af90]  pl-4">
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
              <div className="left-0 right-0 mx-auto w-30 h-2 rounded-md bg-[#47af90]"></div>
            </div>

            <div className="flex-shrink-0 flex-col items-center my-20 sm:flex-row sm:justify-center">
              <img src={movil2} alt="Imagen 4" className="w-96 h-auto mb-4 sm:mb-0 mx-auto sm:mr-96" style={{ transform: 'scaleX(-1)' }} />
              <img src={movil} alt="Imagen 3" className="w-96 h-auto mx-auto  sm:order-last" />
            </div>
          </div>

          <div className="text-center my-40">
            <div className="inline-block">
              <p className="text-5xl mb-4">Discover a new way to Communicate.</p>
              <div className="left-0 right-0 rounded-md mx-auto w-30 h-2 bg-[#47af90]"></div>
            </div>

            <div className="flex-shrink-0 flex items-center my-40 sm:flex-row sm:justify-center">
              <img src={capa} alt="Imagen 3" className="w-64 md:w-96 h-auto mx-2" />
              <img src={parrot8} alt="Imagen 4" className="w-64 md:w-96 h-auto mx-2" />
            </div>
          </div>
        </div>

        <Footer />

      </div>
    </>
  )
}

export default App
