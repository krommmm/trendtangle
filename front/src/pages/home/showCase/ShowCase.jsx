import { NavLink } from "react-router-dom";
import blueG from "../../../assets/pictures/blueG.jpg"
import redG from "../../../assets/pictures/redG.jpg"
import shoes from "../../../assets/pictures/shoes.jpg"

export function ShowCase() {

    return (
        <div className="showCase">
            <NavLink to="hotDeals">
                <article>
                    <div className="showCase_img">
                        <img src={blueG} alt="" />
                    </div>
                    <div className="showCase_text">
                        <p className="showCase_text_title">Hot Deals</p>
                        <p className="showCase_text_shop">
                            SHOP NOW{' '}
                            <i className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                </article>
            </NavLink>
            <NavLink to="newproducts">
                <article>
                    <div className="showCase_img">
                        <img src={redG} alt="" />
                    </div>
                    <div className="showCase_text">
                        <p className="showCase_text_title">New Products</p>
                        <p className="showCase_text_shop">
                            SHOP NOW{' '}
                            <i className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                </article>
            </NavLink>
            <NavLink to="/gender?gender=child&page=1">
                <article>
                    <div className="showCase_img">
                        <img src={shoes} alt="" />
                    </div>
                    <div className="showCase_text">
                        <p className="showCase_text_title">Child</p>
                        <p className="showCase_text_shop">
                            SHOP NOW{' '}
                            <i className="fa-solid fa-arrow-right"></i>
                        </p>
                    </div>
                </article>
            </NavLink>
        </div>
    );
};