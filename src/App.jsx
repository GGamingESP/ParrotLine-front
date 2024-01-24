import { RxDownload } from "react-icons/rx";

function App() {
  return (
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
          <div className="flex items-center"> { }
            <img src="ruta-del-logotipo.png" alt="Logo" className="h-8 w-8 mr-2" /> { }
            <a className=" text-xl">ParrotLine</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-xl space-x-20">
            <li><a>About us</a></li>
            <li><a>ParrotLine Web</a></li>
            <li><a>Privacy</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn border-none hover:bg-[#47af90] hover:scale-[103%] transition-all text-xl bg-[#47af90] text-white">
            Download
            <RxDownload size={27} />
          </button>
        </div>
      </div>
  )
}

export default App
