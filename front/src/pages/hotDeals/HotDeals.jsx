import { getArticles } from "../../services/service_articles";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "../../components/common/Article";
import { Page } from "../../components/common/Page";
import { getArticlesWithDiscountPrice } from "../../functions/getArticlesWithDiscountPrice";

export function HotDeals() {

    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(getCurrentPage());

    const [pagination, setPagination] = useState({
        pageName: "hotdeals",
        totalItems: 0,
        itemsPerPage: 8,
        range: 2,
        currentPage: getCurrentPage(),
        rangeArr: []
    });

    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page")) || 1;
        return page;
    }

    useEffect(() => {
        setCurrentPage(getCurrentPage());
        getHotDeals();
    }, [location.search]);

    async function getHotDeals() {
        const res = await getArticles();
        const myArticles = res.data.articles;
        const hotDealsArticles = getHotDealsArticles(myArticles);
        const hotDealsArticlesWithDiscountPrice = getArticlesWithDiscountPrice(hotDealsArticles);
        const page = getCurrentPage();
        const nbItemsPerPage = pagination.itemsPerPage;

        const filteredArticlesByPage = [];
        for (let i = ((page - 1) * nbItemsPerPage); i < (page * nbItemsPerPage); i++) {
            if (i + 1 > hotDealsArticlesWithDiscountPrice.length) break;
            filteredArticlesByPage.push(hotDealsArticlesWithDiscountPrice[i]);
        }

        const majFilterArticlesByPage = filteredArticlesByPage.map((article) => ({
            ...article,
            priceDiscounted: (article.price * (1 - (article.discount / 100))).toFixed(2)
        }));

        const nbPages = Math.ceil(hotDealsArticlesWithDiscountPrice.length / nbItemsPerPage);

        const rangeArr = getPageRange(page, nbPages, pagination.range);
        setArticles(majFilterArticlesByPage);
        setPagination({ ...pagination, totalItems: majFilterArticlesByPage.length, currentPage: page, nbPages: nbPages, rangeArr: rangeArr });

    }

    function getHotDealsArticles(articles) {
        return articles.filter((article) => article.discount > 0 || (article.flash.state === true && article.flash.sale > 0));
    }



    function getPageRange(currentPage, totalPages, rangeSize = 4) {

        const half = Math.floor(rangeSize / 2);
        let start = Math.max(1, currentPage - Math.floor(half));
        let end = currentPage + half;

        if (currentPage + half > totalPages) {
            end = totalPages;
            const diff = currentPage + half - totalPages;
            start = Math.max(1, start - diff);
        } else if (currentPage - half < start) {
            const diff = half - currentPage;
            end = end + diff;
        }

        const rangeArr = [];

        for (let i = start; i < end + 1; i++) {
            rangeArr.push(i);
        }
        if (start !== 1) {
            // creation de : 1 ...
            rangeArr.unshift(1);
            if (start > 2) rangeArr.splice(1, 0, '...');
        }
        if (end !== totalPages) {
            // creation de : ... totalPages
            if (end < totalPages - 1) rangeArr.push('...');
            rangeArr.push(totalPages);
        }

        return rangeArr;

    }

    return (
        <div className="hotDeals">
            <h2 className="bigTitle">Hot Deals</h2>
            <div className="hotDealsContainer">
                <Article articles={articles} onUpdate={getHotDeals} />

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