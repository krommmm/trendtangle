import getArticles from '../../services/getArticles';
import { useState, useEffect, useRef } from 'react';
import { addToPanier } from '../../services/servicePanier';
import { useFlip } from '../../FlipContext';

function SpecialOffer() {
	const [offer, setOffer] = useState([]);
	const [jours, setJours] = useState();
	const [heures, setHeures] = useState();
	const [minutes, setMinutes] = useState();
	const [secondes, setSecondes] = useState();

	const msgRef = useRef(null);
	const { toggleFlip } = useFlip();

	useEffect(() => {
		getArticles()
			.then((res) => {
				// console.log(res.articles);
				res.articles.forEach((article) => {
					let currentDate = new Date().getTime();

					if (article.special_offer * 1000 > currentDate) {
						let nbMilli = calculerDecompte(article.special_offer);
						setOffer(article);
						afficherDecompte(nbMilli);

						return;
					}
				});
			})
			.catch((err) => console.error(err));
	}, []);

	function calculerDecompte(timeLeft) {
		const dateActuelle = new Date().getTime();
		let diff = timeLeft * 1000 - dateActuelle;
		var totalMilliseconds = diff;
		return totalMilliseconds;
	}

	async function afficherDecompte(nbMilli) {
		let sec = Math.round(nbMilli / 1000);
		for (let i = 0; i < sec; i++) {
			// Conversion en heures, minutes et secondes
			let jours = Math.floor(nbMilli / (1000 * 3600 * 24));
			let heures = Math.floor((nbMilli % (1000 * 3600 * 24)) / (1000 * 3600));
			let minutes = Math.floor((nbMilli % (1000 * 3600)) / (1000 * 60));
			let secondes = Math.floor((nbMilli % (1000 * 60)) / 1000);

			let joursHMS = jours < 10 ? `0${jours}` : jours;
			let heuresHMS = heures < 10 ? `0${heures}` : heures;
			let minutesHMS = minutes < 10 ? `0${minutes}` : minutes;
			let secondesHMS = secondes < 10 ? `0${secondes}` : secondes;
			//let affichage = `${heuresHMS}:${minutesHMS}:${secondesHMS}`;
			setJours(joursHMS);
			setHeures(heuresHMS);
			setMinutes(minutesHMS);
			setSecondes(secondesHMS);

			await new Promise((resolve) => setTimeout(resolve, 1000));
			nbMilli -= 1000;
		}
	}

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
			// console.log('Hauteur du scroll : ' + scrollHeight);
			msgRef.current.parentElement.style.top = `${scrollHeight + 300}px`;
		}

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<div className="specialOffer">
				<p className="bigTitle">special offer</p>
				<div className="offer_container">
					<img
						className="newProducts_caroussel_img left"
						src={`https://gobliiins.fr/pictures/articles/${offer.img}`}
						alt=""
					/>
					<div className="offer_container__text">
						<div className="offer_container__text-timer">
							<div className="offer_container__jours timer">
								{jours} <span className="hms"> jours</span>
							</div>
							<div className="offer_container__heures timer">
								{heures} <span className="hms"> heures</span>
							</div>
							<div className="offer_container__minutes timer">
								{minutes} <span className="hms"> minutes</span>
							</div>
							<div className="offer_container__secondes timer">
								{secondes} <span className="hms"> secondes</span>
							</div>
						</div>
						<p className="offer_container__text-title">
							hot deal this week{' '}
						</p>
						<button className="btn"
											onClick={addToCart}
											data-id={offer.uuid}>ADD TO CART</button>
					</div>
					<img
						className="newProducts_caroussel_img right"
						src={`https://gobliiins.fr/pictures/articles/${offer.img}`}
						alt=""
					/>
				
				</div>
				<div className="msg_box hidden">
							<p ref={msgRef}></p>
						</div>
			</div>
			
		</>
	);
}
export default SpecialOffer;
