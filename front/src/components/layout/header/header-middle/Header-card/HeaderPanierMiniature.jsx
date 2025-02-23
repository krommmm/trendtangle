import { NavLink } from "react-router-dom";
import { HOST } from "../../../../../global.config.js";
import { useEffect, useState } from "react";
import { deleteItemsFromPanier } from "../../../../../services/service_panier.js";
import { useNavigate } from "react-router-dom";
import { usePanier } from "../../../../../context/context_panier.jsx";
import { getArticlesWithDiscountPrice } from "../../../../../functions/getArticlesWithDiscountPrice.js";

export function HeaderPanierMiniature({ articles, onUpdate, backPanier, statePanier }) {

    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { panierFlip, togglePanier } = usePanier();
    const [myArticles, setMyArticles] = useState([]);


    useEffect(() => {
        getArticles();
    }, [onUpdate, panierFlip, myArticles]);


    async function getArticles() {
        setMyArticles(getArticlesWithDiscountPrice(articles));
        getTotal(myArticles);
    }

    function getTotal(items) {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            // console.log(parseFloat((articles[i].quantity * articles[i].price).toFixed(2)));
            total += items[i].discount && items[i].discount > 0 ? Number((items[i].priceDiscounted * items[i].quantity).toFixed(2)) : Number((items[i].quantity * items[i].price).toFixed(2));
        }
        total = parseFloat(total.toFixed(2));
        setTotal(total);
    }

    function leavePanier() {
        backPanier(!statePanier);
    }

    async function handleDeleteArticle(e) {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const articleId = e.target.closest(".headerPanierMiniature__articles__article").dataset.id;
        const data = {
            itemId: articleId,
            quantity: 100
        }
        const response = await deleteItemsFromPanier(data, token);
        console.log(response);
        onUpdate();
        togglePanier();
    }

    function goToPanierPage() {
        navigate("/panier");
    }



    return (
        <div className="headerPanierMiniature">
            <div className="headerPanierMiniature__header"><i className="fa-solid fa-circle-xmark headerPanierMiniature__header__leave" onClick={(e) => leavePanier(e)}></i></div>
            <div className="headerPanierMiniature__articles">
                {myArticles.map((article, index) => (
                    <div className="headerPanierMiniature__articles__article" key={index} data-id={article._id}>
                        <div className="headerPanierMiniature__articles__article__img">
                            <img src={`${HOST}/images/${article.imgUrl}`} alt="" />
                            <div className="headerPanierMiniature__articles__article__delete" onClick={(e) => handleDeleteArticle(e)}><i className="fa-solid fa-xmark"></i></div>
                        </div>
                        <div className="headerPanierMiniature__articles__article__text">
                            <p className="headerPanierMiniature__articles__article__text--title">{article.name}</p>
                            <p className="headerPanierMiniature__articles__article__text--price">{article.quantity}x&nbsp;{article.discount && article.discount > 0 ? article.priceDiscounted : article.price} €</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="headerPanierMiniature__total">
                <p className="headerPanierMiniature__total__selection"><span className="itemSelected">{articles.length}</span> item(s) selected</p>
                <p className="headerPanierMiniature__total__total">SubTotal: {total} €</p>
            </div>
            <div className="headerPanierMiniature__buttons">
                <button className="headerPanierMiniature__buttons--btn btn-black" onClick={(e) => goToPanierPage(e)}>View Card</button>
                <button className="headerPanierMiniature__buttons--btn btn-red">Buy</button>
            </div>
        </div>
    );
}