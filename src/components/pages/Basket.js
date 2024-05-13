import { getPanier, modifyBasket } from '../../services/servicePanier';
import { useState, useEffect, useRef } from 'react';
import { useFlip } from '../../FlipContext';
import { deleteArticleFromPanier } from '../../services/servicePanier';

function Basket(props) {
	const { flip } = useFlip();
	const [panier, setPanier] = useState(props.panier);
	const [total, setTotal] = useState();
	const [totalPrice, setTotalPrice] = useState(props.totalPrice);
	const [toggle, setToggle] = useState(false);
	const [currentId, setCurrentId] = useState('');
	const [myState, setMyState] = useState(props.etat);

	const confirmRef = useRef(null);
	const { toggleFlip } = useFlip();
	const msgRef = useRef(null);

	async function handleChange(e, index) {
		const newPanier = [...panier];
		newPanier[index].quantity = e.target.value;
		setPanier(newPanier);
		// changer aussi la quantité et merci d'afficher le discount pour la page
		const token = JSON.parse(localStorage.getItem('token'));
		let quantity = e.target.value;
		let articleId = e.target.dataset.id;
		let res = await modifyBasket(token, articleId, quantity);
		console.log(res);
		toggleFlip();
		msgRef.current.textContent = res.msg;
		msgRef.current.parentElement.classList.add('hidden');
		await new Promise((resolve) => setTimeout(resolve, 10));
		msgRef.current.parentElement.classList.remove('hidden');
	}

	function handleCmd(e) {}


	async function handleDelete(e) {
		// are you sure ?
		setCurrentId(e.target.dataset.id);
		confirmRef.current.classList.toggle('hidden');
	}

	function handleConfirmNo(e) {
		confirmRef.current.classList.toggle('hidden');
	}
	async function handleConfirmYes(e) {
		const uuid = currentId;
		const token = JSON.parse(localStorage.getItem('token'));
		await new Promise((resolve) => setTimeout(resolve, 10));
		const res = await deleteArticleFromPanier(token, uuid);
		console.log(res);
		msgRef.current.textContent = `${res.msg}`;
		msgRef.current.parentElement.classList.add('hidden');
		await new Promise((resolve) => setTimeout(resolve, 10));
		msgRef.current.parentElement.classList.remove('hidden');
		setToggle(!toggle);
		props.remonterEtat(!myState);
		toggleFlip();
		confirmRef.current.classList.toggle('hidden');
	}

	return (
		<>
			<div className="basket">
				{props.panier.map((article, index) => (
					<div key={index} className="basket__article">
						<img
							src={`https://gobliiins.fr/pictures/articles/${article.img}`}
							alt=""
						/>
						<div className="basket__article__text">
							<p className="basket__article__text--titre">
								{article.name}
							</p>
							<p className="basket__article__text--category">
								<span className="bold">Color: </span>
								{article.color}
							</p>
							<p className="basket__article__text--category">
								<span className="bold">Gender: </span>
								{article.gender}
							</p>
							<p className="basket__article__text--category">
								<span className="bold">Category: </span>
								{article.category}
							</p>
						</div>
						<div className="basket__article__prix">
							<div className="basket__article__quantity">
								<label>
									<span className="bold">Quantity: </span>
								</label>
								<select
									id="mySelect"
									value={article.quantity}
									data-id={article.uuid}
									onChange={(e) => handleChange(e, index)}
								>
									{Array.from(
										{ length: article.stock },
										(_, index) => (
											<option key={index}>
												{index + 1}
											</option>
										)
									)}
								</select>
							</div>
							<div className="basket__article__prix">
								<label>
									<span className="bold">Prix / unity: </span>
								</label>
								{(
									article.price *
									(1 - article.discount / 100)
								).toFixed(2)}
								€
							</div>
							<div className="basket__article__total">
								<label>
									<span className="bold">Total: </span>
								</label>
								{(
									article.price *
									(1 - article.discount / 100) *
									article.quantity
								).toFixed(2)}
								€
							</div>
							<button
								className="btn"
								data-id={article.uuid}
								onClick={handleDelete}
							>
								Delete
							</button>
						</div>
					</div>
				))}
				<div className="areYouSure hidden" ref={confirmRef}>
					<p>Are you sure ?</p>
					<button
						className="btnLittle btn-no"
						onClick={handleConfirmNo}
					>
						No
					</button>{' '}
					<button
						className="btnLittle btn-yes"
						onClick={handleConfirmYes}
					>
						Yes
					</button>
				</div>
				<div className="basket__prixTotal">
					<label>
						<span className="bold">Prix total: </span>
					</label>
					{props.totalprice}€
				</div>
				<button className="btn basket__valider" onClick={handleCmd}>
					Valider la commande
				</button>
			</div>
			<div className="msg_box hidden">
				<p ref={msgRef}></p>
			</div>
		</>
	);
}
export default Basket;
