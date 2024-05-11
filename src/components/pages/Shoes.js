import { useState, useEffect } from 'react';
import getArticles from '../../services/getArticles';
import Articles from '../utils/Articles';

function Shoes() {
	const [shoes, setShoes] = useState([]);
	const [toggle, setToggle] = useState(false);


	useEffect(() => {
		getArticles()
			.then((res) => {
				let newArticles = [];
				res.articles.forEach((article) => {
					if (article.category === 'chaussure') {
						newArticles.push(article);
					}
				});
				setShoes(newArticles);
			})
			.catch((err) => console.error(err));
	}, [toggle]);



	return (
		<>
			<div className="shoes">
				<p className="bigTitle">New Products</p>
				<Articles data={shoes} refresh={setToggle} stateRefresh={toggle}/>
			</div>
		</>
	);
}
export default Shoes;
