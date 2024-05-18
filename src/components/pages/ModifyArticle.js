import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { updateArticle } from '../../services/serviceArticle';
import getArticles from '../../services/getArticles';

const ModifyArticle = (props) => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const uuid = searchParams.get('uuid');
	const [theArticle, setTheArticle] = useState({});
	const [timeJHMS, setTimeJHMS] = useState('');
	const msgRef = useRef(null);
	const imgRef = useRef(null);

	const [myImg, setMyImg] = useState('');
	const [discount, setDiscount] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [priceDiscount, setPriceDiscount] = useState(0);
	const [stock, setStock] = useState('');
	const [stars, setStars] = useState('');
	const [specialOffer, setSpecialOffer] = useState('');
	const [isNew, setIsNew] = useState(false);
	const [selectGender, setSelectGender] = useState('');
	const [selectColor, setSelectColor] = useState('');
	const [selectCategory, setSelectCategory] = useState('');

	useEffect(() => {
		getItemByUUid(uuid);
	}, [uuid]);

	useEffect(() => {
		if (theArticle) {
			setMyImg(theArticle.img);
			setSelectGender(theArticle.gender);
			setSelectColor(theArticle.color);
			setSelectCategory(theArticle.category);
			setName(theArticle.name);
			setPrice(parseFloat(theArticle.price));
			 setPriceDiscount((parseFloat(theArticle.price)*(1-parseFloat(theArticle.discount)/100)).toFixed(2));
			setStock(theArticle.stock);
			setIsNew(theArticle.isNew === 0 ? false : true);
			setStars(theArticle.stars);
			setDiscount(theArticle.discount);
		}
	}, [theArticle]);

	async function getItemByUUid(uuid) {
		const res = await getArticles();

		res.articles.forEach((article) => {
			if (article.uuid === uuid) {
				setTheArticle(article);
				const dateActuelle = new Date().getTime();
				let diff = article.special_offer * 1000 - dateActuelle;
				var totalMilliseconds = diff;

				let jours = Math.floor(totalMilliseconds / (1000 * 3600 * 24));
				let heures = Math.floor(
					(totalMilliseconds % (1000 * 3600 * 24)) / (1000 * 3600)
				);
				// let minutes = Math.floor((totalMilliseconds % (1000 * 3600)) / (1000 * 60));
				// let secondes = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

				let joursHMS = jours < 10 ? `0${jours}` : jours;
				let heuresHMS = heures < 10 ? `0${heures}` : heures;
				// let minutesHMS = minutes < 10 ? `0${minutes}` : minutes;
				// let secondesHMS = secondes < 10 ? `0${secondes}` : secondes;
				if (article.special_offer * 1000 > dateActuelle) {
					setTimeJHMS(`${joursHMS} days and ${heuresHMS} hours`);
				} else {
					setTimeJHMS(`No special offer`);
				}
				return;
			}
		});
	}

	async function handleModifier(e) {

		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', price);
		formData.append('stock', stock);
		formData.append('color', selectColor);
		formData.append('gender', selectGender);
		formData.append('category', selectCategory);
		formData.append('special_offer', specialOffer); // faire special offer
		formData.append('discount', discount);
		formData.append('stars', stars);
		formData.append('image', myImg);
		formData.append('isNew', isNew ? 1 : 0);
		formData.append('_method', 'PUT');

		const token = JSON.parse(localStorage.getItem('token'));
		await new Promise((resolve) => setTimeout(resolve, 10));

		const res = await updateArticle(token, uuid, formData);
		console.log(res);
		msgRef.current.textContent=res.msg;
		msgRef.current.parentElement.classList.toggle("hidden");
	}

	function handleName(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	function handleImg(e) {
		setMyImg(e.target.files[0]);
		if (e.target.files[0]) {
			const reader = new FileReader();
			reader.onload = function (event) {
				imgRef.current.src = event.target.result;
			};
			reader.readAsDataURL(e.target.files[0]);
		}
	}
	function handleDiscount(e) {
		let reduc = parseFloat(e.target.value);
		if (reduc >= 0 && reduc <= 99) {
			setDiscount(reduc);
			theArticle.discount=reduc;
			handleDiscountedPrice();
		}
	}
	function handlePrice(e) {
		let priceNumber = parseFloat(e.target.value);
		setPrice(priceNumber);
		theArticle.price=priceNumber;
		handleDiscountedPrice();
	}
	function handleDiscountedPrice(e){
		setPriceDiscount((theArticle.price*(1-theArticle.discount/100)).toFixed(2));

	}
	function handleStock(e) {
		setStock(e.target.value);
	}
	function handleSpecialOffer(e) {
		setSpecialOffer(e.target.value);
	}
	function handleStars(e) {
		if (e.target.value >= 0 && e.target.value <= 5) {
			setStars(e.target.value);
		}
	}
	function handleIsNew(e) {
		setIsNew(!isNew);
	}

	return (
		<>
			<div className="articleUpdate__container">
				<div className="articleUpdate__inputs">
					<label for="myImgModify" className="btn">
						Add IMG
					</label>
					<input type="file" id="myImgModify" onChange={handleImg} />
					<input
						type="number"
						onChange={handleDiscount}
						className="articleUpdate__inputs-discount inputs"
						placeholder="DISCOUNT"
						min="0"
						max="99"
					/>
					<input
						type="button"
						className="articleUpdate__inputs-new inputs"
						value={isNew === true ? 'New' : 'Old'}
						onClick={handleIsNew}
					/>

					<select
						value={selectColor}
						onChange={(e) => setSelectColor(e.target.value)}
						className="inputs"
					>
						<option value="">Selectionner une couleur</option>
						<option value="bleu">Bleu</option>
						<option value="blanc">Blanc</option>
						<option value="rouge">Rouge</option>
					</select>

					<select
						value={selectGender}
						onChange={(e) => setSelectGender(e.target.value)}
						className="inputs"
					>
						<option value="">Selectionner une genre</option>
						<option value="femme">Femme</option>
						<option value="homme">Homme</option>
						<option value="enfant">Enfant</option>
					</select>

					<select
						value={selectCategory}
						onChange={(e) => setSelectCategory(e.target.value)}
						className="inputs"
					>
						<option value="">Selectionner une catégorie</option>
						<option value="pull">pull</option>
						<option value="pantalon">pantalon</option>
						<option value="t-shirt">t-shirt</option>
						<option value="chaussure">chaussure</option>
					</select>

					<input
						type="text"
						onInput={handleName}
						className="articleUpdate__inputs-name inputs"
						placeholder="NAME"
					/>
					<input
						type="number"
						onChange={handlePrice}
						className="articleUpdate__inputs-price inputs"
						placeholder="PRICE"
					/>
					<input
						type="number"
						onChange={handleStock}
						className="articleUpdate__inputs-stock inputs"
						placeholder="STOCK"
					/>
					<input
						type="number"
						onChange={handleSpecialOffer}
						className="articleUpdate__inputs-special_offer inputs"
						placeholder="TIME OFFER"
					/>
					<input
						type="number"
						onChange={handleStars}
						className="articleUpdate__inputs-stars inputs"
						placeholder="STARS"
						min="0"
						max="5"
					/>
				</div>
				<div className="articleUpdate">
					<div className="articleUpdate__img">
						<img
							ref={imgRef}
							src={`https://gobliiins.fr/pictures/articles/${myImg}`}
							alt=""
						/>
						<p className="articleUpdate__text-isNew">
							{isNew === true ? 'new' : 'old'}
						</p>
						<p className="articleUpdate__text-discount">
							-{discount}%
						</p>
					</div>
					<div className="articleUpdate__text">
						<div className="articleUpdate__text__multiplesChoices">
							<p className="articleUpdate__text-color">
								{selectColor}
							</p>
							<p className="articleUpdate__text-gender">
								{selectGender}
							</p>
							<p className="articleUpdate__text-category">
								{selectCategory}
							</p>
						</div>
						<p className="articleUpdate__text-name">{name}</p>
						{priceDiscount>0 ? (<p className="articleUpdate__text-price">{priceDiscount} <span className="rayé">{price}</span> €</p> ):( <p className="articleUpdate__text-price">{price} €</p> )}
		
					
						<p className="articleUpdate__text-stock">
							{' '}
							{stock} unités disponibles
						</p>
						<p className="articleUpdate__text-special_offer">
							{timeJHMS} Left
						</p>
						<p className="article__text-stars">
							{' '}
							{Array.from({
								length: stars,
							}).map((_, i) => (
								<i key={i} className="fa-solid fa-star"></i>
							))}
						</p>
					</div>
				</div>
				<button
					className="btn modifier-btn margin-15"
					onClick={handleModifier}
				>
					MODIFY
				</button>
			</div>
			<div className="msg_box hidden ">
				<p ref={msgRef}></p>
			</div>
		</>
	);
};
export default ModifyArticle;
