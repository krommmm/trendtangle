import '../../assets/css/index.css';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ListMenuCategory from '../others/ListMenuCategory';
import ListMenuGender from '../others/ListMenuGender';
import ListMenuColor from '../others/ListMenuColor';
import getArticles from '../../services/getArticles';
import {
	getPanier,
	deleteArticleFromPanier,
} from '../../services/servicePanier';
import { useFlip } from '../../FlipContext';

function Menu(props) {
	const { flip } = useFlip();
	const [isOpenCategory, setIsOpenCategory] = useState(false);
	const [isOpenGender, setIsOpenGender] = useState(false);
	const [isOpenColor, setIsOpenColor] = useState(false);

	const [articles, setArticles] = useState([]);
	const [panier, setPanier] = useState([]);
	const [searchedValue, setSearchedValue] = useState('');
	const [total, setTotal] = useState();
	const [open, setOpen] = useState(false);
	const panierRef = useRef(null);
	const panierIconRef = useRef(null);
	const [isConnected, setIsConnected] = useState(false);
	const [triggers, setTriggers] = useState(false);
	const [triggersAdmin, setTriggersAdmin] = useState(props.stateAdmin);
	const { toggleFlip } = useFlip();

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token'));
		if (token) {
			setIsConnected(true);
		} else {
			setIsConnected(false);
		}
	}, [flip]);

	useEffect(() => {
		getArticles()
			.then((res) => {
				setArticles(res.articles);
			})
			.catch((err) => console.error(err));
	}, [flip]);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token'));
		getPanier(token)
			.then((res) => {
				setPanier(res.articles);
				let cumul = 0;
				for(let i=0;i<res.articles.length;i++){
					cumul += (parseFloat(res.articles[i].price)*(1-(parseFloat(res.articles[i].discount))/100)*parseFloat(res.articles[i].quantity));
				}
				setTotal(cumul.toFixed(2));

			})
			.catch((err) => console.error(err));
			panierIconRef.current.classList.add("move");
			setTimeout(()=>{
				panierIconRef.current.classList.remove("move");
			},1001);
	}, [triggers, flip]);

	useEffect(() => {
		if (open) {
			panierRef.current.classList.remove('hidden');
		} else {
			panierRef.current.classList.add('hidden');
		}
	}, [open]);

	const handleMouseEnterCategory = () => {
		if (!isOpenCategory) setIsOpenCategory(true);
	};
	const handleMouseLeaveCategory = () => {
		if (isOpenCategory) setIsOpenCategory(false);
	};

	const handleMouseEnterGender = () => {
		if (!isOpenGender) setIsOpenGender(true);
	};
	const handleMouseLeaveGender = () => {
		if (isOpenGender) setIsOpenGender(false);
	};

	const handleMouseEnterColor = () => {
		if (!isOpenColor) setIsOpenColor(true);
	};
	const handleMouseLeaveColor = () => {
		if (isOpenColor) setIsOpenColor(false);
	};
	function handleSearch(e) {
		setSearchedValue(e.target.value);
	}
	async function handleDeletePanier(e) {
		const token = await JSON.parse(localStorage.getItem('token'));
		const uuid = e.target.dataset.id;
		const res = await deleteArticleFromPanier(token, uuid);
		console.log(res);
		setTriggers(!triggers);
		toggleFlip();
	}

	function handleDisconnect(e) {
		localStorage.removeItem('token');
		setIsConnected(false);
		window.location.reload();
	}

	return (
		<>
			<section className="menu">
				<div className="menu_top">
					<div className="menu_top_left">
						<ul>
							<li>
								<i className="fa-solid fa-phone"></i>
								<p>+021-95-51-84</p>
							</li>
							<li>
								<i className="fa-solid fa-envelope"></i>
								mail@email.com
							</li>
							<li>
								<i className="fa-solid fa-location-dot"></i>
								1734 Stonecoal Road
							</li>
						</ul>
					</div>
					<div className="menu_top_right">
						<ul>
							<li>
								<NavLink aria-label="" to="/auth">
									<i className="fa-solid fa-user"></i>My
									account
								</NavLink>
							</li>
							{isConnected && (
								<li onClick={handleDisconnect}>
									<i class="fa-solid fa-user-slash"></i>
									Disconnect
								</li>
							)}
						</ul>
					</div>
				</div>
				<div className="menu_middle">
					<div className="menu_middle-logo">
						<p>
							Trendtangle<span className="red">.</span>
						</p>
					</div>
					<div className="menu_middle-searchBar">
						<form className="form_searchBar">
							<input type="text" onChange={handleSearch} />
							<NavLink
								to={`/searchedProducts?search=${searchedValue}`}
							>
								<button>Search</button>
							</NavLink>
						</form>
					</div>
					<div className="menu_middle-save">
						<div className="cart">
							<ul>
							
								<li>
									<div className="panier_container">
										<i
											className="fa-solid fa-cart-shopping" 
											onClick={() => setOpen(!open)}
										></i>
										<div className="panier_container_total_icon" ref={panierIconRef}>
										
												<p
													className="panier_container_total_icon-para"
												>
													{panier.length}
												</p>
										
										</div>
										<p>Your Cart</p>
										<div
											className="panier__miniature hidden"
											ref={panierRef}
										>
											<i
												class="fa-solid fa-circle-xmark"
												onClick={() => setOpen(false)}
											></i>
											<div className="panier__miniature__articles">
												{panier.map(
													(article, index) => (
														<div
															className="panier__miniature_article"
															key={index}
														>
															<div className="panier__miniature_article__img">
																<img
																	src={`https://gobliiins.fr/pictures/articles/${article.img}`}
																	alt=""
																/>
																<i
																	data-id={
																		article.uuid
																	}
																	class="fa-solid fa-circle-xmark"
																	onClick={
																		handleDeletePanier
																	}
																></i>
															</div>
															<div className="panier__miniature_article__text">
																<p className="panier__miniature_article__text-name">
																	{
																		article.name
																	}
																</p>
																<p>
																	{
																		article.quantity
																	}{' '}
																	x{' '}
																	<span className="bold">
																		{
																			article.priceDiscount.toFixed(2)
																		}
																		€
																	</span>
																</p>
															</div>
														</div>
													)
												)}
											</div>
											<div className="panier__miniature__total">
												<p className="panier__miniature__total-nbItems">
													{panier.length} item(s)
													selected
												</p>
												<p className="panier__miniature__total-total">
													Total: {total}€
												</p>
											</div>
											<div className="panier__miniature__options">
										
												<NavLink
													to="/PreBasket"
													className="basket_Zone"
												>
													<button className="btn black">
														View Cart
													</button>
												</NavLink>
												{/* <NavLink
													to="/buy"
													className="basket_Zone"
												> */}
													<button className="btn">
														Buy
													</button>
												{/* </NavLink> */}
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="menu_bottom">
					<div className="menu_bottom_container">
						<ul>
							<li>
								<NavLink
									to="/"
									className={({ isActive }) =>
										isActive ? 'activeLink' : undefined
									}
								>
									Home
								</NavLink>
							</li>
							{props.isAdmin && (
								<li>
									<NavLink
										to="/adminmod"
										className={({ isActive }) =>
											isActive ? 'activeLink' : undefined
										}
									>
										Admin
									</NavLink>
								</li>
							)}
							<li>
								<NavLink
									to="/HotDeals"
									className={({ isActive }) =>
										isActive ? 'activeLink' : undefined
									}
								>
									Hot Deals
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/NewProducts"
									className={({ isActive }) =>
										isActive ? 'activeLink' : undefined
									}
								>
									New Products
								</NavLink>
							</li>
							<li
								className={({ isActive }) =>
									isActive ? 'activeLink' : undefined
								}
								onMouseEnter={handleMouseEnterCategory}
								onMouseLeave={handleMouseLeaveCategory}
							>
								<div className="liste_categories">
									Categories
									{isOpenCategory && (
										<ListMenuCategory
											category={'category'}
										/>
									)}
								</div>
							</li>
							<li
								className={({ isActive }) =>
									isActive ? 'activeLink' : undefined
								}
								onMouseEnter={handleMouseEnterGender}
								onMouseLeave={handleMouseLeaveGender}
							>
								<div className="liste_categories">
									Gender
									{isOpenGender && (
										<ListMenuGender category={'gender'} />
									)}
								</div>
							</li>
							<li
								className={({ isActive }) =>
									isActive ? 'activeLink' : undefined
								}
								onMouseEnter={handleMouseEnterColor}
								onMouseLeave={handleMouseLeaveColor}
							>
								<div className="liste_categories">
									Color
									{isOpenColor && (
										<ListMenuColor category={'color'} />
									)}
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}
export default Menu;
