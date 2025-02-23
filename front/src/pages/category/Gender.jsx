import { getArticles } from "../../services/service_articles";
import { useEffect, useState } from "react";
import { Article } from "../../components/common/Article";
import { useLocation } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { Page } from "../../components/common/Page";
import { getArticlesWithDiscountPrice } from "../../functions/getArticlesWithDiscountPrice";

export function Gender() {

    const [articles, setArticles] = useState([]);
    const location = useLocation();
    const [gender, setGender] = useState(getGenderURL());
    const pagination = usePagination(articles);
    const [myCategory, setMyCategory] = useState("");

    useEffect(() => {
        setGender(getGenderURL());
        getGender();
    }, [location.search]);


    async function getGender() {
        const res = await getArticles();
        const myArticles = res.data.articles;
        const genderArticle = getGenderArticles(myArticles);
        const genderArticleWithDiscountPrice = getArticlesWithDiscountPrice(genderArticle);
        const categorySimple = getCategorySimple();
        setMyCategory(categorySimple);
        setArticles(genderArticleWithDiscountPrice);
    }

    function getGenderURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get("gender");
        return page;
    }

    function getGenderArticles(articles) {
        const gender = getGenderURL();
        return articles.filter((article) => article.gender === gender);
    }



    function getCategorySimple() {
        const str = window.location.href;
        const url = new URL(str);
        const category = url.searchParams.get("gender");
        return category;
    }

    return (
        <div className="gender">
            <h2 className="bigTitle">Gender</h2>
            <div className="genderContainer">
                <Article articles={pagination.filterArticleByPage} onUpdate={getGender}/>
       
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