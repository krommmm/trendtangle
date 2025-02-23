import { getArticles } from "../../services/service_articles";
import { useEffect, useState } from "react";
import { Article } from "../../components/common/Article";
import { usePagination } from "../../hooks/usePagination.jsx";
import { Page } from "../../components/common/Page";
import { getArticlesWithDiscountPrice } from "../../functions/getArticlesWithDiscountPrice";

export function AllProducts() {

    const [articles, setArticles] = useState([]);
    const pagination = usePagination(articles);

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        const res = await getArticles();
        if (!res) return;
        const myArticles = res.data.articles;
        if (!myArticles) return;
        const articlesWithDiscountPrice = getArticlesWithDiscountPrice(myArticles);
        setArticles(articlesWithDiscountPrice);
    }


    return (
        <>
            <div className="newProducts">
                <h2 className="bigTitle">New Products</h2>
                <div className="newProductsContainer">
                    <Article articles={pagination.filterArticleByPage} onUpdate={getAllProducts} />

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
        </>
    );
}