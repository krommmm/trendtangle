import { getPanier, modifyBasket } from '../../services/servicePanier';
import { useState, useEffect, useRef } from 'react';
import { useFlip } from '../../FlipContext';

function Basket(props) {
	const { flip } = useFlip();
	const [panier, setPanier] = useState(props.panier);
	const [total, setTotal] = useState();
	const [totalPrice, setTotalPrice] = useState(props.totalPrice);
	const [toggle, setToggle] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const { toggleFlip } = useFlip();
	const msgRef = useRef(null);

	// useEffect(() => {
	// 	const token = JSON.parse(localStorage.getItem('token'));
	// 	getPanier(token)
	// 		.then((res) => {
				
	// 			setPanier(res.articles);
	// 			setTotal(res.totalPrice);
	// 			console.log(res);
	// 			if (res.totalPrice === 0) {
	// 				window.location.href = './';
	// 			}
	// 			let cumul = 0;
	// 			for(let i=0;i<res.articles.length;i++){
	// 				cumul += (parseFloat(res.articles[i].price)*(1-(parseFloat(res.articles[i].discount))/100)*parseFloat(res.articles[i].quantity));
	// 			}
	// 			setTotalPrice(cumul);
	// 		})
	// 		.catch((err) => console.error(err));
	// }, [flip]);

	useEffect(() => {
		// Mettre le focus sur l'option sélectionnée après le rendu initial
		const selectElement = document.getElementById('mySelect');
		if (selectElement) {
			selectElement.selectedIndex = selectedIndex;
		}
	}, [selectedIndex, flip]);

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

	return (
		<>
			<div className="basket">
				{panier.map((article, index) => (
					<div key={index} className="basket__article">
						<img
							src={`http://localhost/api_multi/pictures/articles/${article.img}`}
							alt=""
						/>
						<div className="basket__article__text">
							<p className="basket__article__text--titre">
								{article.name}
							</p>
							<p className="basket__article__text--category">
								<span className="bold">Color: </span>{article.color}
							</p>
							<p className="basket__article__text--category">
							<span className="bold">Gender: </span>{article.gender}
							</p>
							<p className="basket__article__text--category">
							<span className="bold">Category: </span>{article.category}
							</p>
						</div>
						<div className="basket__article__prix">
							<div className="basket__article__quantity">
								<label><span className="bold">Quantity: </span></label>
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
								<label><span className="bold">Prix / unity: </span></label>{(article.price*(1-(article.discount/100)))}€
							
							</div>
							<div className="basket__article__total">
								<label><span className="bold">Total: </span></label>{(article.price*(1-(article.discount/100))) * article.quantity}€
							</div>
						</div>
					</div>
				))}
				<div className="basket__prixTotal">
				<label><span className="bold">Prix total: </span></label>{totalPrice}€
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
