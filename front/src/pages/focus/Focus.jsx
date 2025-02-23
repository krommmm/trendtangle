import { getOneArticle } from "../../services/service_articles";
import { useState, useEffect } from "react";
import { FocusArticle } from "../../components/common/focusArticle";
import { isUserOwner } from "../../services/service_auth";

export function Focus() {

    const [article, setArticle] = useState([]);
    const [rightsToManageArticle, setRightToManageArticle] = useState(false);

    useEffect(() => {
        manageFocus();
    }, []);

    async function manageFocus() {
        const articleId = getArticleIdURL();
        const res = await getOneArticle(articleId);
        const articleRes = res.data.article;
        const updatedArticles = addPriceDiscountToArticle(articleRes);
        setArticle(updatedArticles);
        const userId = getUserIdWithToken();
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        if (!token) {
            setRightToManageArticle(false);
            return;
        }
        const preDoesUserHasRightsToManageTheArticle = await isUserOwner(token, userId, articleId);
        const doesUserHasRightsToManageTheArticle = preDoesUserHasRightsToManageTheArticle.isUserOwner;
        setRightToManageArticle(doesUserHasRightsToManageTheArticle);

    }

    function getUserIdWithToken() {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.userId;
        return userId;
    }

    function addPriceDiscountToArticle(article) {
        article.priceDiscounted = (article.price * (1 - (article.discount / 100))).toFixed(2);
        if (article.flash && article.flash.state === true && article.flash.sale > 0) {
            if (article.discount && article.flash.sale > article.discount) {
                article.priceDiscounted = (article.price * (1 - (article.flash.sale / 100))).toFixed(2);
                article.discount = article.flash.sale;
            } else if (!article.discount) {
                article.priceDiscounted = (article.price * (1 - (article.flash.sale / 100))).toFixed(2);
                article.discount = article.flash.sale;
            }
        }
        return article;
    }

    function getArticleIdURL() {
        const str = window.location.href;
        const url = new URL(str);
        return url.searchParams.get("articleId");
    }

    return (

        <div className="focus">
            <FocusArticle article={article} rights={rightsToManageArticle} onUpdate={manageFocus} />
        </div>
    );
}