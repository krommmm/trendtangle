import { useState, useRef, useEffect } from 'react';
import imgPreviewBase from '../../assets/pictures/addImg.png';
import { postArticle } from '../../services/serviceArticle';

function ModalArticle(props) {
	const [open, setOpen] = useState(true);
	const [imagePreview, setImagePreview] = useState(imgPreviewBase);
	const formRef = useRef(null);
	const inputRef = useRef(null);
	const nameRef = useRef(null);
	const priceRef = useRef(null);
	const stockRef = useRef(null);
	const newRef = useRef(null);
	const specialRef = useRef(null);
	const discountRef = useRef(null);
	const starsRef = useRef(null);
	const msgRef = useRef(null);

	const [isNew, setIsNew] = useState(false);

	const [triggers, setTriggers] = useState(props.stateRefresh);
	const [someBool, setSomeBool] =useState(props.stateTriggersAnswerModal); 


	const [selectGender, setSelectGender] = useState('');
	const [selectColor, setSelectColor] = useState('');
	const [selectCategory, setSelectCategory] = useState('');

	const handleLeave = () => {
		setOpen(!open);
		props.remonter(!open);
	};

	const handleImgChange = (e) => {
		if (e.target.files[0]) {
			setImagePreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	useEffect(() => {
		props.refresh(props.stateRefresh);
	}, [props]);

	async function handleform(e) {
		e.preventDefault();

		let conversionIsNew = isNew === true ? 1 : 0;

		const formData = new FormData();
		formData.append('name', nameRef.current.value);
		formData.append('price', priceRef.current.value);
		formData.append('stock', stockRef.current.value);
		formData.append('isNew', conversionIsNew);
		formData.append('color', selectColor);
		formData.append('gender', selectGender);
		formData.append('category', selectCategory);
		formData.append('special_offer', specialRef.current.value);
		formData.append('discount', discountRef.current.value);
		formData.append('stars', starsRef.current.value);
		formData.append('image', inputRef.current.files[0]);

		console.log(selectColor);
		await new Promise((resolve) => setTimeout(resolve, 10));
		const token = JSON.parse(localStorage.getItem('token'));
		const res = await postArticle(token, formData);
		console.log(res);
		if(res.error){
			props.remonterAnswerModal(res.error);
		}else if(res.msg){
			props.remonterAnswerModal(res.msg);
		}
		props.remonterTriggersAnswerModal(!someBool);
		formRef.current.reset();
		handleLeave();
		props.refresh(!triggers);
	}

	function handleNew(e) {
		setIsNew(!isNew);
	}
	return (
		<>
			<div className="modalArticle">
				<div className="modalArticle__container">
					<div className="modalArticle__container__leave">
						<i
							onClick={handleLeave}
							className="fa-solid fa-circle-xmark"
						></i>
					</div>
					<div className="modalArticle__container-header">
						<label htmlFor="modalArticle__container-img">
							<img
								src={imagePreview}
								className="preview"
								alt="Preview"
							/>
						</label>
						<input
							ref={inputRef}
							type="file"
							id="modalArticle__container-img"
							className="modalArticle__container-img"
							onChange={handleImgChange}
						/>
					</div>
					<div className="modalArticle__container-body">
						<form ref={formRef} className="modalArticle_form">
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-name">Name</label>
								<input
									type="text"
									id="modalArticle-name"
									className="modalArticle-name"
									placeholder="Name"
									ref={nameRef}
								/>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-price">
									price
								</label>
								<input
									type="text"
									id="modalArticle-price"
									className="modalArticle-price"
									placeholder="Price"
									ref={priceRef}
								/>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-stock">
									Stock disponible
								</label>
								<input
									type="text"
									id="modalArticle-stock"
									className="modalArticle-stock"
									placeholder="Stock"
									ref={stockRef}
								/>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-new">New</label>

								<input
									type="button"
									onClick={handleNew}
									value={isNew}
								/>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-color">
									Color
								</label>

								<select
									value={selectColor}
									onChange={(e) =>
										setSelectColor(e.target.value)
									}
								>
									<option value="">
										Selectionner une couleur
									</option>
									<option value="bleu">Bleu</option>
									<option value="blanc">Blanc</option>
									<option value="rouge">Rouge</option>
								</select>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-gender">
									Gender
								</label>

								<select
									value={selectGender}
									onChange={(e) =>
										setSelectGender(e.target.value)
									}
								>
									<option value="">
										Selectionner une genre
									</option>
									<option value="femme">Femme</option>
									<option value="homme">Homme</option>
									<option value="enfant">Enfant</option>
								</select>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-category">
									Category
								</label>
								<select
									value={selectCategory}
									onChange={(e) =>
										setSelectCategory(e.target.value)
									}
								>
									<option value="">
										Selectionner une catégorie
									</option>
									<option value="pull">pull</option>
									<option value="pantalon">pantalon</option>
									<option value="t-shirt">t-shirt</option>
									<option value="chaussure">chaussure</option>
								</select>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-special">
									Special offer
								</label>
								<input
									type="text"
									id="modalArticle-specialOffer"
									className="modalArticle-speciaOffer"
									placeholder="Days left"
									ref={specialRef}
								/>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-discount">
									Discount
								</label>
								<input
									type="number"
									min="0"
									max="99"
									id="modalArticle-discount"
									className="modalArticle-discount"
									placeholder="Discount"
									ref={discountRef}
								/>
							</div>
							<div className="modalArticle__input">
								<label htmlFor="modalArticle-stars">
									Stars
								</label>
								<input
									type="text"
									id="modalArticle-stars"
									className="modalArticle-stars"
									placeholder="Stars"
									min="0"
									max="99"
									ref={starsRef}
								/>
							</div>

							<button
								className="btn send-btn"
								onClick={handleform}
							>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		
		</>
	);
}
export default ModalArticle;
