import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getArticles from '../../services/getArticles';
import Articles from '../utils/Articles';

function Gender() {
	const [articlesByCategory, setArticlesByCategory] = useState([]);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const category = searchParams.get('category');
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		getArticles()
			.then((res) => {
				let newArticles = [];
				res.articles.forEach((article) => {
					if (article.gender === `${category}`) {
						newArticles.push(article);
					}
				});
				setArticlesByCategory(newArticles);
			})
			.catch((err) => console.error(err));
	}, [category, toggle]);

	return (
		<>
			<div className="Category">
				<p className="bigTitle">{category}</p>
				<Articles data={articlesByCategory} refresh={setToggle} stateRefresh={toggle} />
			</div>
		</>
	);
}
export default Gender;
