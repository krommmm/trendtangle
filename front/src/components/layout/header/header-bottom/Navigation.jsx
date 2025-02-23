import { NavLink } from "react-router-dom";
import { MenuDeroulant } from "./MenuDeroulant";
import { useState } from "react";

export function Navigation({ isUserAdmin }) {
    const [toggleCategory, setToggleCategory] = useState(false);
    const [toggleGender, setToggleGender] = useState(false); 
    const [toggleColor, setToggleColor] = useState(false);
    const [activeLink, setActiveLink] = useState(""); // Gérer l'état actif
    const category = { name: "category", values: ["pull", "t-shirt", "pantalon", "shoes"] };
    const gender = { name: "gender", values: ["female", "male","unisex", "child"] };
    const color = { name: "color", values: ["blue","orange","green", "white", "back"] };


    function handleMouseEnterCategory() {
        if (!toggleCategory) setToggleCategory(true);
    }
    function handleMouseEnterGender() {
        if (!toggleGender) setToggleGender(true);
    }
    function handleMouseEnterColor() {
        if (!toggleColor) setToggleColor(true);
    }

    function handleMouseLeaveCategory() {
        if (toggleCategory) setToggleCategory(false);
    }
    function handleMouseLeaveGender() {
        if (toggleGender) setToggleGender(false);
    }
    function handleMouseLeaveColor() {
        if (toggleColor) setToggleColor(false);
    }

    function handleActiveLink(name) {
        setActiveLink(name);
    }

    return (
        <div className="navigation">
            <div className="navigation__container">
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive || activeLink === "home" ? "activeLink" : "")}
                            onClick={() => handleActiveLink("home")}
                        >
                            Home
                        </NavLink>
                    </li>
                    {isUserAdmin && <li className="navigation__container__admin">
                        <NavLink
                            to="/adminArticles?page=1"
                            className={({ isActive }) => (isActive || activeLink === "adminArticles" ? "activeLink" : "")}
                            onClick={() => handleActiveLink("adminArticles")}
                        >
                            Admin
                        </NavLink>
                    </li>}
                    <li>
                        <NavLink
                            to="/HotDeals?page=1"
                            className={({ isActive }) => (isActive || activeLink === "hotDeals" ? "activeLink" : "")}
                            onClick={() => handleActiveLink("hotDeals")}
                        >
                            Hot Deals
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/NewProducts?page=1"
                            className={({ isActive }) => (isActive || activeLink === "newProducts" ? "activeLink" : "")}
                            onClick={() => handleActiveLink("newProducts")}
                        >
                            New Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/allProducts?page=1"
                            className={({ isActive }) => (isActive || activeLink === "allProducts" ? "activeLink" : "")}
                            onClick={() => handleActiveLink("allProducts")}
                        >
                            All Products 
                        </NavLink>
                    </li>
                    <li>
                        <div
                            className={activeLink === "category" ? "activeLink" : "classique"}
                            onMouseEnter={handleMouseEnterCategory}
                            onMouseLeave={handleMouseLeaveCategory}
                            onClick={() => handleActiveLink("category")} 
                        >
                            Category
                            {toggleCategory && <MenuDeroulant type={category} />}
                        </div>
                    </li>
                    <li>
                        <div
                            className={activeLink === "gender" ? "activeLink" : "classique"} 
                            onMouseEnter={handleMouseEnterGender}
                            onMouseLeave={handleMouseLeaveGender}
                            onClick={() => handleActiveLink("gender")}
                        >
                            Gender
                            {toggleGender && <MenuDeroulant type={gender} />}
                        </div>
                    </li>
                    <li>
                        <div
                            className={activeLink === "color" ? "activeLink" : "classique"}
                            onMouseEnter={handleMouseEnterColor}
                            onMouseLeave={handleMouseLeaveColor}
                            onClick={() => handleActiveLink("color")}
                        >
                            Color
                            {toggleColor && <MenuDeroulant type={color} />}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
