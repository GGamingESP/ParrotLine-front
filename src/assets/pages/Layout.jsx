import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <>
            <li>
                <Link to="/Login" className="text-2xl">About Us</Link>
            </li>
            <li>
                <Link to="/Login" className="text-4xl">ParrotLine Web</Link>
            </li>
            <li>
                <Link to="/Login" className="text-2xl">Privacy</Link>
            </li>
        <hr />
        <Outlet />
        </>
    )
}

export default Layout;