import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <>
            <li>
                <Link to="/AboutUs" className="text-2xl">About Us</Link>
            </li>
            <li>
                <Link to="/ParrotLineWeb" className="text-4xl">ParrotLine Web</Link>
            </li>
            <li>
                <Link to="/Privacy" className="text-2xl">Privacy</Link>
            </li>
            <hr />
            <Outlet />
        </>
    )
}

export default Layout;