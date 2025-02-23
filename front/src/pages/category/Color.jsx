import { getArticles } from "../../services/service_articles";
import { useEffect, useState } from "react";
import { Article } from "../../components/common/Article";
import { useLocation } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { Page } from "../../components/common/Page";
import { getArticlesWithDiscountPrice }  from "../../functions/getArticlesWithDiscountPrice";

export function Color() {

    const [articles, setArticles] = useState([]);
    const location = useLocation();
    const [color, setColor] = useState(getColorURL());
    const pagination = usePagination(articles);
    const [myCategory, setMyCategory] = useState("");

    useEffect(() => {
        setColor(getColorURL());
        getColor();
    }, [location.search]);


    async function getColor() {
        const res = await getArticles();
        const myArticles = res.data.articles;
        const colorArticles = getColorArticles(myArticles);
        const colorArticlesWithDiscountPrice = getArticlesWithDiscountPrice(colorArticles);
        const categorySimple = getCategorySimple();
        setMyCategory(categorySimple);
        setArticles(colorArticlesWithDiscountPrice);
    }

    function getColorURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("color");
        return page;
    }

    function getColorArticles(articles) {
        const color = getColorURL();
        return articles.filter((article) => article.color === color);
    }

    function getCategorySimple() {
        const str = window.location.href;
        const url = new URL(str);
        const category = url.searchParams.get("color");
        return category;
    }

    return (
        <div className="color">
            <h2 className="bigTitle">Color</h2>
            <div className="colorContainer">
                <Article articles={pagination.filterArticleByPage} onUpdate={getColor}/>
            </div>
            <div className="adminArticles__content__pagination">
                <div className="adminArticles__content__pagination__left pageCube">
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className="adminArticles__content__pagination__pages">
                    <Page pageInfo={pagination} category={myCategory}/>
                </div>
                <div className="adminArticles__content__pagination__right pageCube">
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>
    );
}