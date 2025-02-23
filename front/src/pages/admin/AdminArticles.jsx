import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AdminNavBar } from "./AdminNavBar";
import { SelectOption } from "../../components/common/SelectOption";
import { getArticles } from "../../services/service_articles";
import { Article } from "../../components/common/Article";
import { Page } from "../../components/common/Page";

export function AdminArticles({ isUserAdminToggle }) {
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedColor, setSelectedColor] = useState("all");
    const [articlesSelected, setArticlesSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(getCurrentPage());
    const [pagination, setPagination] = useState({
        pageName:"adminArticles",
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

    const selectOptionInfos = [
        { labelName: "category", optionNames: ["all", "pull", "t-shirt", "pants", "shoes"] },
        { labelName: "gender", optionNames: ["all", "male", "female", "unisex", "child"] },
        { labelName: "color", optionNames: ["all", "blue", "orange", "green", "white", "black"] }
    ];

    // Rafraîchir les articles quand l'URL change 
    useEffect(() => {
        setCurrentPage(getCurrentPage());
        handleArticles();
    }, [location.search, selectedCategory, selectedGender, selectedColor]);

    async function handleArticles() {
        const articles = await getAllArticles();
        const filteredArticles = getFilteredArticles(articles);
        const page = getCurrentPage();
        const nbItemsPerPage = pagination.itemsPerPage;

        // setArticlesSelected(filteredArticles.slice(startIndex, endIndex));
        const filteredArticlesByPage = [];
        for (let i = ((page - 1) * nbItemsPerPage); i < (page * nbItemsPerPage); i++) {
            if (i + 1 > filteredArticles.length) break;
            filteredArticlesByPage.push(filteredArticles[i]);
        }
        const majFilterArticlesByPage = filteredArticlesByPage.map((article) => ({
            ...article,
            priceDiscounted: (article.price * (1 - (article.discount / 100))).toFixed(2)
        }));
        const nbPages = Math.ceil(filteredArticles.length / nbItemsPerPage);

        const rangeArr = getPageRange(page, nbPages, pagination.range);

        setArticlesSelected(majFilterArticlesByPage);
        setPagination({ ...pagination, totalItems: filteredArticles.length, currentPage: page, nbPages: nbPages, rangeArr: rangeArr });
    }

    async function getAllArticles() {
        const res = await getArticles();
        return res.data.articles;
    }

    function getFilteredArticles(articles) {
        return articles.filter((article) =>
            (selectedCategory === "all" || article.category.toLowerCase() === selectedCategory.toLowerCase() || article.category === "all") &&
            (selectedGender === "all" || article.gender.toLowerCase() === selectedGender.toLowerCase() || article.gender === "all") &&
            (selectedColor === "all" || article.color.toLowerCase() === selectedColor.toLowerCase() || article.color === "all")
        );
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
        <div className="adminArticles">
            {isUserAdminToggle && <AdminNavBar />}
            <div className="adminArticles__content">
                <div className="adminArticles__content__selection">
                    <div className="adminArticles__content__selection--category">
                        <SelectOption info={selectOptionInfos[0]} back={setSelectedCategory} />
                    </div>
                    <div className="adminArticles__content__selection--gender">
                        <SelectOption info={selectOptionInfos[1]} back={setSelectedGender} />
                    </div>
                    <div className="adminArticles__content__selection--color">
                        <SelectOption info={selectOptionInfos[2]} back={setSelectedColor} />
                    </div>
                </div>
                <div className="adminArticles__content__articles">
                    <Article articles={articlesSelected} onUpdate={handleArticles} />
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
        </div>
    );
}
