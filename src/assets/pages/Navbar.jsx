import logoImage from '../images/loro.png'
import { RxDownload } from 'react-icons/rx'

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-[#5894ad] text-white">
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
                        <a href="/"><img src={logoImage} alt="Logo" className="h-14 w-14 mr-1" /></a>
                        <a href="/" className="text-4xl">PARROTLITE</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-20">
                        <li><a href="/About_us" className='text-2xl'>About us</a></li>
                        <li><a href="/Login" className='text-4xl'>ParrotLine Web</a></li>
                        <li><a href="/Privacy" className='text-2xl'>Privacy</a></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <button className="btn border-none hover:bg-[#47af90] hover:scale-[103%] transition-all text-xl bg-[#47af90] text-white">
                        Download
                        <RxDownload size={27} />
                    </button>
                </div>
            </div>

            
        </>

    )
}