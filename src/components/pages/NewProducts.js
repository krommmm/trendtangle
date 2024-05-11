import { useState, useEffect } from 'react';
import getArticles from '../../services/getArticles';
import Articles from '../utils/Articles';

function NewProducts() {
	const [newArticles, setNewArticles] = useState([]);
	const [toggle, setToggle] = useState(false);


	useEffect(() => {
		getArticles()
			.then((res) => {
				let newArticles = [];
				res.articles.forEach((article) => {
					if (article.isNew === 1) {
						newArticles.push(article);
					}
				});
				setNewArticles(newArticles);
			})
			.catch((err) => console.error(err));
	}, [toggle]);
	

	return (
		<>
			<div className="newProducts">
				<p className="bigTitle">New Products</p>
				<Articles data={newArticles} refresh={setToggle} stateRefresh={toggle} />
			</div>
		</>
	);
}
export default NewProducts;
