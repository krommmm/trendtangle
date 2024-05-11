import { useState, useEffect } from 'react';
import getArticles from '../../services/getArticles';
import Articles from '../utils/Articles';

function HotDeals() {
	const [hotDeals, setHotDeals] = useState([]);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		getArticles()
			.then((res) => {
				let newArticles = [];
				res.articles.forEach((article) => {
					if (article.discount !== 0) {
						newArticles.push(article);
					}
				});
				setHotDeals(newArticles);
			})
			.catch((err) => console.error(err));
	}, [toggle]);

	return (
		<>
			<div className="hotDeals">
				<p className="bigTitle">Hot deals</p>
				<Articles data={hotDeals} refresh={setToggle} stateRefresh={toggle} />
			</div>
		</>
	);
}
export default HotDeals;
