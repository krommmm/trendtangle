import { NavLink } from "react-router-dom";

export function MiniMenu({ isUserAdmin, onUpdate }) {


    return (
        <div className="miniMenu">
            <div className="miniMenu__header"><i className="fa-solid fa-circle-xmark" onClick={() => onUpdate()}></i></div>
            <div className="miniMenu__body">
                <ul>
                    <li>
                        <NavLink
                            onClick={() => onUpdate()}
                            to="/"
                            className={({ isActive }) => (isActive === "home" ? "activeLink" : "")}

                        >
                            Home
                        </NavLink>
                    </li>
                    {isUserAdmin && <li className="navigation__container__admin">
                        <NavLink
                            onClick={() => onUpdate()}
                            to="/adminArticles?page=1"
                            className={({ isActive }) => (isActive === "adminArticles" ? "activeLink" : "")}

                        >
                            Admin
                        </NavLink>
                    </li>}
                    <li>
                        <NavLink
                            onClick={() => onUpdate()}
                            to="/HotDeals?page=1"
                            className={({ isActive }) => (isActive === "hotDeals" ? "activeLink" : "")}
                        >
                            Hot Deals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={() => onUpdate()}
                            to="/NewProducts?page=1"
                            className={({ isActive }) => (isActive === "newProducts" ? "activeLink" : "")}
                        >
                            New Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            onClick={() => onUpdate()}
                            to="/allProducts?page=1"
                            className={({ isActive }) => (isActive === "allProducts" ? "activeLink" : "")}
                        >
                            All Products
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
}