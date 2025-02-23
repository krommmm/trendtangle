import { NavLink } from "react-router-dom";

export function AdminNavBar() {


    return (
        <nav className="adminNavBar">

            <div className="adminNavBar__bar"><ul>
                <div className="adminNavBar__bar__header">Admin</div>
                <NavLink to="/adminAdd" className={({ isActive }) => (isActive ? "activeLink" : "")}><li><i className="fa-solid fa-plus"></i>Add</li></NavLink>
                <NavLink to="/adminArticles"className={({ isActive }) => (isActive ? "activeLink" : "")}><li><i className="fa-brands fa-product-hunt"></i>Products</li></NavLink>
                <NavLink to="/adminFlash" className={({ isActive }) => (isActive ? "activeLink" : "")}><li><i className="fa-regular fa-hourglass-half"></i>Flash</li></NavLink>
                <li><i className="fa-solid fa-cubes-stacked"></i>Stocks</li>
                <li><i className="fa-solid fa-bell"></i>Alertes</li>
                <li><i className="fa-solid fa-cart-shopping"></i>Commands</li>
                <li><i className="fa-solid fa-user"></i>Profils</li>
                <li><i className="fa-solid fa-user"></i>Parameters</li>
            </ul></div>
        </nav>
    );
}

