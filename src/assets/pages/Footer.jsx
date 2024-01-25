import { RxDownload, RxGithubLogo } from "react-icons/rx";
import logoImage from '../images/loro.png'

function Footer() {
    return (
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
    )
}

export default Footer