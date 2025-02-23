import { getArticles } from "../../services/service_articles";
import { useEffect, useState } from "react";
import { Article } from "../../components/common/Article";
import { usePagination } from "../../hooks/usePagination";
import { useLocation } from "react-router-dom";
import { Page } from "../../components/common/Page";
import { getArticlesWithDiscountPrice } from "../../functions/getArticlesWithDiscountPrice";

export function Category() {

    const [articles, setArticles] = useState([]);
    const location = useLocation();
    const [category, setCategory] = useState(getCategoryURL());
    const pagination = usePagination(articles);
    const [myCategory, setMyCategory] = useState("");
    

    useEffect(() => {
        setCategory(getCategoryURL());
        getCategory();
    }, [location.search]);


    async function getCategory() {
        const res = await getArticles();
        const myArticles = res.data.articles;
        const categoryArticles = getCategoryArticles(myArticles);
        const categoryArticlesWithDiscountPrice = getArticlesWithDiscountPrice(categoryArticles);
        const categorySimple = getCategorySimple();
        setMyCategory(categorySimple);
        setArticles(categoryArticlesWithDiscountPrice);
    }

    function getCategoryURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category");
        return category;
    }

    function getCategoryArticles(articles) {
        const category = getCategoryURL();
        return articles.filter((article) => article.category === category);
    }

    function getCategorySimple() {
        const str = window.location.href;
        const url = new URL(str);
        const category = url.searchParams.get("category");
        return category;
    }


    return (
        <div className="category">
            <h2 className="bigTitle">Category</h2>
            <div className="categoryContainer">
                <Article articles={pagination.filterArticleByPage} onUpdate={getCategory}/>

            </div>
            <div className="adminArticles__content__pagination">
                <div className="adminArticles__content__pagination__left pageCube">
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className="adminArticles__content__pagination__pages">
                    <Page pageInfo={pagination} category={myCategory} />
                </div>
                <div className="adminArticles__content__pagination__right pageCube">
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>

        </div>
    );
}