import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AdminNavBar } from "./AdminNavBar";
import { SelectOption } from "../../components/common/SelectOption";
import { getArticles } from "../../services/service_articles";
import { ArticleFlash } from "../../components/common/ArticleFlash";
import { Page } from "../../components/common/Page";
import { createFlashOffer, deleteFlashOffer } from "../../services/service_flash";

export function AdminFlash(isUserAdminToggle) {

    const location = useLocation();
    const [selectedTime, setSelectedTime] = useState("24h");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedColor, setSelectedColor] = useState("all");
    const [articlesSelected, setArticlesSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(getCurrentPage());
    const [articleIds, setArticleIds] = useState([]);
    const [isReset, setIsReset] = useState(false);

    const [pagination, setPagination] = useState({
        pageName: "adminFlash",
        totalItems: 0,
        itemsPerPage: 8,
        range: 2,
        currentPage: getCurrentPage(),
        rangeArr: []
    });
    const [fetchAnswer, setFetchAnswer] = useState(null);
    const [answerData, setAnswerData] = useState({
        success: {
            color: "green", msg: "Promotion created", active: "false"
        },
        faillure: {
            color: "red", msg: "Promotion could not be created", active: "false"
        },
        wait: {
            color: "red", msg: "You must reset before submit", active: "false"
        }
    });

    function getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page")) || 1;
        return page;
    }

    const selectOptionInfos = [
        { labelName: "category", optionNames: ["all", "pull", "t-shirt", "pants", "shoes"] },
        { labelName: "gender", optionNames: ["all", "male", "female", "unisex", "child"] },
        { labelName: "color", optionNames: ["all", "blue", "orange", "green", "white", "black"] },
        { labelName: "time", optionNames: ["24h", "48h", "1semaine"] },
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

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        let date = null;

        switch (selectedTime) {
            case '24h':
                date = new Date().getTime() + (1000 * 3600 * 24);
                break;

            case '48h':
                date = new Date().getTime() + (1000 * 3600 * 48);
                break;

            case '1semaine':
                date = new Date().getTime() + (1000 * 3600 * 24 * 7);
                break;

            default: throw new Error("Aucune date selectionnée")
        }

        const data = {
            articleIds: articleIds,
            name: form.name.value,
            date: date,
            sale: Number(form.sale.value)
        }
        if ((data.name === "" || data.name === undefined || data.name === null) || (data.date === "" || data.date === null || data.date === undefined)) {
            setFetchAnswer(false);
            setAnswerData({ ...answerData, success: { ...answerData.success, active: "false" } });
            return;
        }

        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));

        const res = await createFlashOffer(data, token);
        console.log(res);
        if (res.ok) {
            setFetchAnswer(true);
            setAnswerData({ ...answerData, success: { ...answerData.success, active: "true" } })
        } else {
            setFetchAnswer(false);
            setAnswerData({ ...answerData, success: { ...answerData.success, active: "false" } })
        };

        form.reset();

    }

    async function handleReset(e) {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        await deleteFlashOffer(token);
        setIsReset(true);
        sessionStorage.setItem("trendtangle-flash-articles-ids", JSON.stringify([]));

        handleArticles();
    }

    return (
        <div className="adminFlash">
            {isUserAdminToggle && <AdminNavBar />}
            <div className="adminFlash__content">
                <div className="adminFlash__content__header">
                    <h3>Create a group promotion on items</h3>
                </div>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="adminFlash__containerInput">
                        <label htmlFor="">Name: </label>
                        <input type="text" name="name" placeholder="flash name" />
                    </div>
                    <div className="adminFlash__containerInput">
                        <label htmlFor="">Sale: </label>
                        <input type="number" name="sale" min="1" max="99" className="inputFlashSale" />
                    </div>

                    <div className="adminFlash__content__selection--time ">
                        <SelectOption info={selectOptionInfos[3]} back={setSelectedTime} />
                    </div>
                    <button type="button" className="adminFlash__content__reset" onClick={(e) => handleReset(e)}>Reset flash offers</button>
                    {isReset ? (<button type="submit" className="adminFlash__content__create">Submit</button>) : (<button type="button" className="adminFlash__content__create greyed">Submit</button>)}
                </form>
                <div className="adminFlash__content__footer">
                    {fetchAnswer !== null && <p
                        className={`visible--true} submitContainer__answer--${fetchAnswer ? answerData.success.color : answerData.faillure.color} `}>
                        {fetchAnswer ? answerData.success.msg : answerData.faillure.msg}
                    </p>}
                </div>
                <div className="adminFlash__content__selection">
                    <div className="adminFlash__content__selection--category">
                        <SelectOption info={selectOptionInfos[0]} back={setSelectedCategory} />
                    </div>
                    <div className="adminFlash__content__selection--gender">
                        <SelectOption info={selectOptionInfos[1]} back={setSelectedGender} />
                    </div>
                    <div className="adminFlash__content__selection--color">
                        <SelectOption info={selectOptionInfos[2]} back={setSelectedColor} />
                    </div>
                </div>
                <div className="adminFlash__content__articles">
                    {articlesSelected && articlesSelected.length > 0 && < ArticleFlash articles={articlesSelected} onUpdate={handleArticles} updateFlashArticleIds={setArticleIds} />}
                </div>
                <div className="adminFlash__content__pagination">
                    <div className="adminFlash__content__pagination__left pageCube">
                        <i className="fa-solid fa-angle-left"></i>
                    </div>
                    <div className="adminFlash__content__pagination__pages">
                        <Page pageInfo={pagination} />
                    </div>
                    <div className="adminFlash__content__pagination__right pageCube">
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
} 