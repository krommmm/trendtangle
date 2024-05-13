import { useState, useEffect, useRef } from 'react';
import getArticles from '../../services/getArticles';
import { addToPanier } from '../../services/servicePanier';
import { useFlip } from '../../FlipContext';
import { likeArticle } from '../../services/serviceArticle';

function NewProducts() {
	const [toggle, setToggle] = useState();
	const [articles, setArticles] = useState([]);
	const [carrouIndex, setCarrouIndex] = useState(0);
	const carrouselRef = useRef(null);
	const msgRef = useRef(null);
	const { toggleFlip } = useFlip();

	useEffect(() => {
		getArticles()
			.then((res) => {
				let newArticles = [];
				res.articles.forEach((article) => {
					if (article.isNew === 1) {
						newArticles.push(article);
					}
				});
				setArticles(newArticles);
			})
			.catch((err) => console.error(err));
	}, [toggle]);

	function turnLeft() {
		console.log('turn left');
		if (carrouIndex > 0) {
			setCarrouIndex(carrouIndex - 1);
		}
	}
	function turnRight() {
		console.log('turn right');
		if (carrouIndex < articles.length - 1) {
			setCarrouIndex(carrouIndex + 1);
		} else {
			setCarrouIndex(0);
		}
	}

	useEffect(() => {
		const carrousel = carrouselRef.current;
		carrousel.style.transform = `translateX(-${carrouIndex * 280}px)`;
	}, [carrouIndex]);

	async function addToCart(e) {
		const token = JSON.parse(localStorage.getItem('token'));
		if (!token) {
			console.log({
				msg: "Aucun token disponible. L'utilisateur doit être connecté.",
			});
			msgRef.current.textContent = `Aucun token disponible. L'utilisateur doit être connecté.`;
			msgRef.current.parentElement.classList.add('hidden');
			await new Promise((resolve) => setTimeout(resolve, 10));
			msgRef.current.parentElement.classList.remove('hidden');
			// Affichez un message à l'utilisateur ou effectuez d'autres actions appropriées pour gérer le cas où l'utilisateur n'est pas connecté.
			return;
		}
		await new Promise((resolve) => setTimeout(resolve, 10));
		let uuid = e.target.dataset.id;
		const res = await addToPanier(token, uuid);
		console.log(res);
		msgRef.current.textContent = `${res.msg}`;
		msgRef.current.parentElement.classList.add('hidden');
		await new Promise((resolve) => setTimeout(resolve, 10));
		msgRef.current.parentElement.classList.remove('hidden');
		toggleFlip();
	}

	useEffect(() => {
		function handleScroll() {
			var scrollHeight =
				document.documentElement.scrollTop || document.body.scrollTop;
			console.log('Hauteur du scroll : ' + scrollHeight);
			msgRef.current.parentElement.style.top = `${scrollHeight + 300}px`;
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	async function handleLike(e) {
		const uuid = e.target.dataset.id;
		const token = JSON.parse(localStorage.getItem('token'));
		await new Promise((resolve) => setTimeout(resolve, 10));
		try {
			const res = await likeArticle(token, uuid);
			console.log(res);
			setToggle(!toggle);
		} catch (err) {
			console.log(err);
			msgRef.current.textContent = `${'You must been connected to like articles'}`;
			msgRef.current.parentElement.classList.add('hidden');
			await new Promise((resolve) => setTimeout(resolve, 10));
			msgRef.current.parentElement.classList.remove('hidden');
		}

		// setToggle(prevToggle => !prevToggle);
	}

	return (
		<>
			<div className="newProducts2">
				<p className="newProducts_title bigTitle">NEW PRODUCTS</p>
				<br />
				<div className="newProducts_carroussel_container">
					<div className="newProducts_caroussel" ref={carrouselRef}>
						{articles.map((article, index) => (
							<div key={index}>
								<div className="newProducts_caroussel_articles">
									<img
										className="newProducts_caroussel_img"
										src={`https://gobliiins.fr/pictures/articles/${article.img}`}
										alt=""
									/>
									<div className="newProducts_carroussel_isNew">
										{article.isNew === 1 ? (
											<p>New</p>
										) : null}
									</div>
									<div className="newProducts_carroussel_isDiscount">
										{article.discount !== 0 ? (
											<p>-{article.discount}%</p>
										) : null}
									</div>
									<div className="newProducts_carroussel_text">
										<p className="newProducts_carroussel_text-category">
											{article.category}&nbsp;&nbsp;
											{article.gender}&nbsp;&nbsp;
											{article.color}
										</p>
										<p className="newProducts_carroussel_text-name">
											{article.name}
										</p>
										<p className="newProducts_carroussel_text-price">
											{article.discount !== 0 ? (
												<>
													{(
														article.price *
														(1 -
															article.discount /
																100)
													).toFixed(2)}
													€{' '}
													<span className="rayé">
														{article.price}€
													</span>
												</>
											) : (
												`${article.price}€`
											)}
										</p>
										<p className="newProducts_carroussel_text-stars">
											{' '}
											{Array.from({
												length: article.stars,
											}).map((_, i) => (
												<i
													key={i}
													className="fa-solid fa-star"
												></i>
											))}
										</p>
										<button
											className="btn"
											onClick={addToCart}
											data-id={article.uuid}
										>
											ADD TO CART
										</button>{' '}
										<div className="article__text-options">
											<i
												data-id={article.uuid}
												onClick={handleLike}
												className="fa-solid fa-thumbs-up"
											></i>
											{article.likes}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="arrowsForCarroussel">
					<i
						onClick={turnLeft}
						className="fa-solid fa-angle-left"
					></i>
					<i
						onClick={turnRight}
						className="fa-solid fa-angle-right"
					></i>
				</div>
			</div>
			<div className="msg_box hidden">
				<p ref={msgRef}></p>
			</div>
		</>
	);
}
export default NewProducts;
