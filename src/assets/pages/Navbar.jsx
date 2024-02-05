import { useState } from 'react';
import logoImage from '../images/loro.png'
import { RxDownload } from 'react-icons/rx'

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        console.log
    }

    return (
        <>
            <div className={`navbar bg-[#5894ad] text-white border-b border-black dark:bg-black ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/About_us">About us</a></li>
                            <li><a href="/Login">ParrotLine Web</a></li>
                            <li><a href="/Privacy">Privacy</a></li>
                        </ul>
                    </div>
                    <div className="flex items-center space-x-3">
                        <a href="/"><img src={logoImage} alt="Logo" className="h-14 w-14 mr-1 transition-transform transform hover:scale-105" /></a>
                        <a href="/" className="text-4xl transition-transform transform hover:scale-105">PARROTLINE</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal px-1 space-x-20">
                        <li className="transition-transform transform hover:scale-110">
                            <a href="/About_us" className="text-2xl">
                                About us
                            </a>
                        </li>
                        <li className="transition-transform transform hover:scale-110">
                            <a href="/Login" className="text-4xl">
                                ParrotLine Web
                            </a>
                        </li>
                        <li className="transition-transform transform hover:scale-110">
                            <a href="/Privacy" className="text-2xl">
                                Privacy
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end flex gap-4">
                    <button className="btn border-none  hover:bg-[#47af90] hover:scale-[103%] transition-all text-xl bg-[#47af90] text-white">
                        Download
                        <RxDownload size={27} />
                    </button>

                    <label className="flex cursor-pointer gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                        </svg>
                        <input type="checkbox" value="synthwave" className="toggle theme-controller" onClick={toggleDarkMode} />
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </label>
                </div>

            </div>
        </>

    )
}

export default Navbar