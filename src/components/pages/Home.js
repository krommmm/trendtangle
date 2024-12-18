import ShowCase from '../others/ShowCase.js';
import NewProducts from '../others/NewProducts.js';
import SpecialOffer from '../others/SpecialOffer.js';
import getArticles from '../../services/getArticles';

import { useState, useEffect } from 'react';

function Home() {
	const [isThereASpecialOffer, setIsThereASpecialOffer] = useState(false);

	useEffect(() => {
		getArticles()
			.then((res) => {
				// console.log(res.articles);
				res.articles.forEach((article) => {
					let currentDate = new Date().getTime();

					if (article.special_offer * 1000 > currentDate) {
						setIsThereASpecialOffer(true);
						return;
					}
				});
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<>
			<div className="home">
				<ShowCase />
				<NewProducts />
				{isThereASpecialOffer && <SpecialOffer />}
			</div>
		</>
	);
}

export default Home;
