import { Article } from "../../../components/common/Article";
import { getArticles } from "../../../services/service_articles";
import { useState, useEffect } from "react";
import { Caroussel } from "../../../components/common/Caroussel";
import { getArticlesWithDiscountPrice } from "../../../functions/getArticlesWithDiscountPrice";

export function NewProducts() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticlesAll();
    }, []);

    async function getArticlesAll() {
        const res = await getArticles();
        let newArticles = res.data.articles.filter((article) => article.isNew === true);
        const articlesDiscounted = getArticlesWithDiscountPrice(newArticles);
        setArticles(articlesDiscounted);
    }



    return (
        <div className="newProductsHome">
            {articles && articles.length > 0 ? (
                <> 
                <h2 className="bigTitle">New products</h2>
                <Caroussel articles={articles} onUpdate={getArticlesAll} /> 
                </>
            ) : (<></>)}

        </div>
    );
}

