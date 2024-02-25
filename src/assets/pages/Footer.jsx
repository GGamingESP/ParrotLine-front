// COMPONENTES
import { RxDownload, RxGithubLogo } from "react-icons/rx";

// IMAGENES
import logoImage from '../images/loro.webp'

function Footer() {
    return (
        <footer className="footer items-center p-4 bg-neutral text-neutral-content">

            {/* LOGOTIPO Y BOTON DE DESCARGA */}

            <aside className="flex items-center space-x-3">
                <a href="/"><img src={logoImage} alt="Logo" className="h-14 w-14 mr-1 transition-transform transform hover:scale-105" /></a>
                <a href="/" className="text-4xl transition-transform transform hover:scale-105">PARROTLINE</a>
                <a href="/ParrotLine_0.0.0_x64_en-US.msi">
                <button className="btn border-none hover:bg-[#47af90] hover:scale-[103%] transition-all text-xl bg-[#47af90] text-white ml-4">
                    Download
                    <RxDownload size={27} />
                </button>
                </a>
            </aside>

            {/* CREATIVE COMMONS */}

            <aside className="flex items-center">
                <p>
                    <span>ParrotLine</span> is licensed under{' '}
                    <a href="http://creativecommons.org/licenses/by-nc/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" className="inline-flex items-center transition-transform transform hover:scale-105">
                        CC BY-NC 4.0
                        <img className="h-6 ml-2" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
                        <img className="h-6 ml-1" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
                        <img className="h-6 ml-1" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC" />
                    </a>
                </p>
            </aside>

            {/* CREADORES */}

            <aside>
                <p>Project Created by: Yeray Santana Curbelo and Iván Da Silva Martín</p>
            </aside>

            {/* ACCESIBILIDAD */}
            
            <aside>
                <a href="https://www.w3.org/TR/WCAG20/"  className="transition-transform transform hover:scale-105">Accesibility</a>
            </aside>

            {/* PROYECTOS GITHUB FRONT/BACK-END */}

            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="https://github.com/GGamingESP/ParrotLine-front" className="transition-transform transform hover:scale-105"><RxGithubLogo size={30} />FRONT</a>
                <a href="https://github.com/GGamingESP/ParrotLine-back" className="transition-transform transform hover:scale-105"><RxGithubLogo size={30} />BACK</a>
            </nav>

        </footer>
    )
}

export default Footer