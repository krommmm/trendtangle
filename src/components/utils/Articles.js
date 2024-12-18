import ModalArticle from './ModalArticle';
import { useState, useRef, useEffect } from 'react';
import { deleteArticle, likeArticle } from '../../services/serviceArticle';
import { NavLink } from 'react-router-dom';
import { addToPanier } from '../../services/servicePanier';
import { useFlip } from '../../FlipContext';

function Articles(props) {
	const { toggleFlip } = useFlip();
	const [answerModal, setAnswerModal] = useState('');
	const [triggersAfterAnswerModal, setTriggersAfterAnswerModal] =
		useState(false);

	// Utilisez toggleFlip pour mettre à jour le flip
	const msgRef = useRef(null);

	const [maj, setMaj] = useState(false);
	const articleRef = useRef(null);
	const deleteRef = useRef(null);
	const [toggle, setToggle] = useState(props.stateRefresh);
	const confirmRef = useRef(null);
	const [currentId, setCurrentId] = useState('');

	const handleCreate = () => {
		setMaj(!maj);
	};
	async function displayAnswerModal() {
		msgRef.current.textContent = answerModal;
		msgRef.current.parentElement.classList.add('hidden');
		await new Promise((resolve) => setTimeout(resolve, 10));
		msgRef.current.parentElement.classList.remove('hidden');
	}

	useEffect(() => {
		if (answerModal !== '') {
			displayAnswerModal();
		}
	}, [triggersAfterAnswerModal]);

	useEffect(() => {
		props.refresh(toggle);
	}, [toggle, props]);

	async function handleDelete(e) {
		// are you sure ?
		setCurrentId(e.target.dataset.id);
		confirmRef.current.classList.toggle('hidden');
	}

	async function handleLike(e) {
		const uuid = e.target.dataset.id;
		const token = JSON.parse(localStorage.getItem('token'));
		await new Promise((resolve) => setTimeout(resolve, 10));
		const res = await likeArticle(token, uuid);

		setToggle(!toggle);
		// setToggle(prevToggle => !prevToggle);
	}

	function handleConfirmNo(e) {
		confirmRef.current.classList.toggle('hidden');
	}
	async function handleConfirmYes(e) {
		const uuid = currentId;
		const token = JSON.parse(localStorage.getItem('token'));
		await new Promise((resolve) => setTimeout(resolve, 10));
		const res = await deleteArticle(token, uuid);

		msgRef.current.textContent = `${res.msg}`;
		msgRef.current.parentElement.classList.add('hidden');
		await new Promise((resolve) => setTimeout(resolve, 10));
		msgRef.current.parentElement.classList.remove('hidden');
		setToggle(!toggle);
		// setToggle(prevToggle => !prevToggle);
		confirmRef.current.classList.toggle('hidden');
	}

	async function addToCart(e) {
		const token = JSON.parse(localStorage.getItem('token'));
		if (!token) {
			// console.log({
			// 	msg: "Aucun token disponible. L'utilisateur doit être connecté.",
			// });
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
	
		msgRef.current.textContent = `${res.msg}`;
		msgRef.current.parentElement.classList.add('hidden');
		await new Promise((resolve) => setTimeout(resolve, 10));
		msgRef.current.parentElement.classList.remove('hidden');
		toggleFlip();
	}

	useEffect(() => {
		function handleScroll() {
		  var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
		  msgRef.current.parentElement.style.top=`${scrollHeight+300}px`;
		  confirmRef.current.style.top=`${scrollHeight+300}px`;
		}
	
		window.addEventListener('scroll', handleScroll);
	
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, []);

	return (
		<>
			{props.isAdmin && (
				<div className="create">
					<button className="btn create-btn" onClick={handleCreate}>
						Create article
					</button>
				</div>
			)}
			{props.isAdmin && maj && (
				<ModalArticle
					remonter={setMaj}
					refresh={setToggle}
					stateRefresh={toggle}
					remonterAnswerModal={setAnswerModal}
					stateTriggersAnswerModal={triggersAfterAnswerModal}
					remonterTriggersAnswerModal={setTriggersAfterAnswerModal}
				/>
			)}

			<div className="articles">
				{props.data.map((article, index) => (
					<div
						className="article"
						key={index}
						data-id={article.uuid}
						ref={articleRef}
					>
						<img
							className="article__img"
							src={`https://gobliiins.fr/pictures/articles/${article.img}`}
							alt=""
						/>
						<div className="article__isNew">
							{article.isNew === 1 ? <p>New</p> : null}
						</div>
						<div className="article__isDiscount">
							{article.discount !== 0 ? (
								<p>-{article.discount}%</p>
							) : null}
						</div>
						<div className="article__text">
							<p className="article__text-category">
								{article.category}&nbsp;&nbsp;{article.gender}
								&nbsp;&nbsp;{article.color}
							</p>
							<p className="article__text-name">{article.name}</p>
							<p className="article__text-price">
								{article.discount !== 0 ? (
									<>
										{(
											article.price *
											(1 - article.discount / 100)
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
							<p className="article__text-stars">
								{' '}
								{Array.from({
									length: article.stars,
								}).map((_, i) => (
									<i key={i} className="fa-solid fa-star"></i>
								))}
							</p>
							<button
								className="article__btn btn cursor"
								onClick={addToCart}
								data-id={article.uuid}
							>
								ADD TO CART
							</button>
				
								<div className="article__text-options">
									<i
										data-id={article.uuid}
										onClick={handleLike}
										className="fa-solid fa-thumbs-up"
									></i>
									{article.likes}
									{props.isAdmin && (<div>
									<NavLink
										to={`/modify?uuid=${article.uuid}`}
									>
										<i
											data-id={article.uuid}
											className="fa-solid fa-gear"
										></i>
									</NavLink>
									<i
										data-id={article.uuid}
										onClick={handleDelete}
										ref={deleteRef}
										className="fa-solid fa-trash-can"
									></i>
									</div> )}
									
								</div>
							
						</div>
					</div>
				))}
			
			</div>
			<div className="msg_box hidden">
				<p ref={msgRef}></p>
			</div>
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
		</>
	);
}
export default Articles;
