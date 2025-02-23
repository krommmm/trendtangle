
import { NavLink } from "react-router-dom";
import { handleLike } from "../../services/service_articles";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HOST } from "../../global.config";


export function ArticleFlash({ articles, onUpdate, updateFlashArticleIds }) {
    const location = useLocation();
    const checkFlashRef = useRef(null);
    const [toggle, setToggle] = useState(false);
    const [articlesIds, setArticlesIds] = useState([]);
    const [fakeArticles, setFakeArticles] = useState([]);

    useEffect(() => {
        manageArticles();
    }, [articles]); 
    
    useEffect(() => {
        const transiArticles = manageFakeFlashSale(articles, articlesIds);
        setFakeArticles(transiArticles);
        sessionStorage.setItem("trendtangle-flash-articles-ids", JSON.stringify(articlesIds));
        updateFlashArticleIds(articlesIds);
    }, [articlesIds]); // Met à jour `fakeArticles` et `sessionStorage` dès que `articlesIds` change
    
    function manageArticles() {
       const arrIds =  getFlashArticlesIds(); // Permet de récupérer les articles qui ont déjà été choisis et de les mettre en vert
       const cumulIds =  getArticlesIdsFromSStorage(arrIds); // Cumul les ids BDD et Storage
       setArticlesIds(cumulIds);
       const transiArticles = manageFakeFlashSale(articles, cumulIds);
       setFakeArticles(transiArticles);
    }

    function manageFakeFlashSale(articles,cumulIds){
        let myArticles = JSON.parse(JSON.stringify(articles));
        for(let i=0;i<myArticles.length;i++){
            if(cumulIds.includes(myArticles[i]._id)){
                myArticles[i].flash.state=true;
            }
        }
        return myArticles;
    }

    function toggleAddArticle(e) {
        const articleId = e.target.closest(".ficheProduit").dataset.id;
        setArticlesIds(prevState => {
            if (prevState.includes(articleId)) {
                return prevState.filter(id => id !== articleId);
            } else {
                return [...prevState, articleId];
            }
        });
    }
    

    function getFlashArticlesIds() {
        const arrIds = [];
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].flash && articles[i].flash.state === true) {
                arrIds.push(articles[i]._id);
            }
        }
        return arrIds;
    }

    function getArticlesIdsFromSStorage(idsDB) {
        const ids = JSON.parse(sessionStorage.getItem("trendtangle-flash-articles-ids"));
        const idsDBAndStorage = idsDB.concat(ids);
        return idsDBAndStorage;
    }

    async function manageLike(e) {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const articleId = e.target.closest(".ficheProduit").dataset.id;
        await handleLike(token, articleId);
        onUpdate();
    }

    return (

        fakeArticles.map((article, index) => (
            <div className="ficheProduit" key={index} data-id={article._id}>
                <NavLink to={`/focus?articleId=${article._id}`} className="ficheProduit__img">
                    <img src={`${HOST}/images/${article.imgUrl}`} alt="img" />
                    {article.isNew && <div className="ficheproduit__img--isNew">New</div>}
                    {article.discount && <div className="ficheProduit__img--discount">-{article.discount}%</div>}

                </NavLink>

                <div className="ficheProduit__text">
                    <p className="ficheProduit__text__category">{article.category}</p>
                    <p className="ficheproduit__text__title">{article.name}</p>
                    <div className="ficheProduit__text--stars">
                        {[...Array(article.stars || 0)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                        ))}
                    </div>
                    <div className="ficheProduit__text--likes">
                        <i className="fa-solid fa-thumbs-up" onClick={(e) => manageLike(e)}></i><p className="ficheProduit__text--likes--like" >{article.likes}</p>
                    </div>

                    <div className="ficheProduit__text__footer">
                        <div className="ficheProduit__text__footer__prices">
                            <p className="ficheProduit__text__footer__prices--price">{article.discount && article.discount > 0 ? article.priceDiscounted : article.price}€</p> {article.discount && <p className="ficheProduit__text__footer__prices--oldprice">{article.price}€</p>}
                        </div>
                        <div className="ficheProduit__text__footer__flash">
                            <i className={`fa-solid fa-circle-${(article.flash !== null || article.flash !== undefined) && article.flash.state === true ? "check" : "xmark"} flash-${(article.flash !== null || article.flash !== undefined) && article.flash.state === true ? "true" : "false"}`} ref={checkFlashRef} onClick={(e) => toggleAddArticle(e)}></i>
                        </div>
                    </div>

                </div>
            </div>
        ))


    );
};