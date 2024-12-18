import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getArticles from '../../services/getArticles';
import Articles from '../utils/Articles';

function SearchedProducts() {
	const [articlesByCategory, setArticlesByCategory] = useState([]);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const searchedValue = searchParams.get('search');
	const [toggle, setToggle] = useState(false);

    const [articles, setArticles] = useState([]);
    const [articlesSearched, setArticlesSearched] = useState([]);


	useEffect(() => {
		getArticles()
			.then((res) => {
				setArticles(res.articles);
                let sortedArticles = res.articles.filter((article)=>article.name.toLowerCase().includes(searchedValue.toLowerCase()));
                setArticlesSearched(sortedArticles);
				// console.log(sortedArticles);
			})
			.catch((err) => console.error(err));
	}, [searchedValue]);



	return (
		<>
			<div className="Category">
				<p className="bigTitle">Searched Products</p>
				<Articles data={articlesSearched} refresh={setToggle} stateRefresh={toggle} />
			</div>
		</>
	);
}
export default SearchedProducts;
