import { useState, useEffect } from "react";
import { articleBySearch } from "../../services/service_articles";
import { useLocation } from "react-router-dom";
import { Article } from "../../components/common/Article";
import { Page } from "../../components/common/Page";
import { usePagination } from "../../hooks/usePagination.jsx";
import { getArticlesWithDiscountPrice } from "../../functions/getArticlesWithDiscountPrice.js";


export function SearchProduct() {
    const [articles, setArticles] = useState([]);
    const [params, setParams] = useState(null);
    const location = useLocation();
    let pagination = usePagination(articles); 

    useEffect(() => {
        setParams(getSearchParams());
        getProducts();
    }, [location]);

    useEffect(()=>{
        updateArticlesWithDiscoutAndFlash();
    },[articles]);

    function updateArticlesWithDiscoutAndFlash() {
        const updateArticlesPrice = getArticlesWithDiscountPrice(articles);
        setArticles(updateArticlesPrice);
    }

    async function getProducts() {
        const searchTerms = getSearchParams();
        const res = await articleBySearch(searchTerms);
        if (!res) return;
        if (res.ok) setArticles(res.data.articles);
    }

    function getSearchParams() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("searchedArticles");
    }

    return (

        <div className="searchProducts">
            <h2 className="bigTitle">Articles By Search</h2>
            <div className="searchProducts__content">
               {pagination.filterArticleByPage && pagination.filterArticleByPage.length>0 && <Article articles={pagination.filterArticleByPage} onUpdate={setArticles} /> }
            </div>
            <div className="adminArticles__content__pagination">
                <div className="adminArticles__content__pagination__left pageCube">
                    <i className="fa-solid fa-angle-left"></i>
                </div>
                <div className="adminArticles__content__pagination__pages">
                    <Page pageInfo={pagination} />
                </div>
                <div className="adminArticles__content__pagination__right pageCube">
                    <i className="fa-solid fa-angle-right"></i>
                </div>
            </div>
        </div>
    );
}