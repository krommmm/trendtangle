import ren from "../../assets/pictures/ren-qingtao-mrg1ZnsoT4Q-unsplash.jpg";
import red from "../../assets/pictures/red.jpg";
import shoes from "../../assets/pictures/shoes.jpg"
import { NavLink } from 'react-router-dom';

function ShowCase() {
	return (
		<>
			<div className="showCase">
				<NavLink to="hotDeals">
					<article>
						<div className="showCase_img">
							<img src={ren} alt="" />
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
							<img src={red} alt="" />
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
				<NavLink to="/Gender?category=enfant">
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
		</>
	);
}

export default ShowCase;
