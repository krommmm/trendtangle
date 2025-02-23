import { useEffect, useState, useRef } from "react";
import { getOnePanier } from "../../services/service_panier";
import { articlesByPanier } from "../../services/service_articles";
import { HOST } from "../../global.config";
import { deleteItemsFromPanier, addToPanier } from "../../services/service_panier";
import { usePanier } from "../../context/context_panier";
import { getArticlesWithDiscountPrice } from "../../functions/getArticlesWithDiscountPrice";

export function Panier() {

    const { panierFlip, togglePanier } = usePanier();
    const [panier, setPanier] = useState([]);
    const [total, setTotal] = useState(0);
    const quantityRef = useRef(null);

    useEffect(() => {
        getMyPanier();
    }, [panierFlip]);

    async function getMyPanier() {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const response = await articlesByPanier(token);
        const articles = response.data.articles;

        const prePanier = await getOnePanier(token);
        const panier = prePanier.data.panier;
        const panierIds = panier.items;

        // Ajout de la quantité pour chaque article  
        const articlesWithQuantity = [];
        for (let i = 0; i < articles.length; i++) {
            for (let j = 0; j < panierIds.length; j++) {
                if (articles[i]._id === panierIds[j].itemId) {
                    articlesWithQuantity.push({ ...articles[i], quantity: panierIds[j].quantity })
                }
            }
        }

        // calcul du prix avec reduction pour chaque article
        const articlesUpdated = getArticlesWithDiscountPrice(articlesWithQuantity);
        const sum = calculTotal(articlesUpdated);
        setTotal(sum);
        setPanier(articlesUpdated);
    }

    async function handleMinus(e) {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));

        const data = {
            itemId: e.target.closest(".panier__container__article").dataset.id,
            quantity: 1
        }
        await deleteItemsFromPanier(data, token);
        togglePanier();
        getMyPanier();
    }

    async function handlePlus(e) {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const data = {
            itemId: e.target.closest(".panier__container__article").dataset.id,
            quantity: 1
        }
        await addToPanier(data, token);
        togglePanier();
        getMyPanier(); 
    }

    async function handleDelete(e) {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const data = {
            itemId: e.target.closest(".panier__container__article").dataset.id,
            quantity: 100
        }
        await deleteItemsFromPanier(data, token);
        togglePanier();
        getMyPanier();
    }

    function calculTotal(articles) {
        let sum = 0;
        for (let i = 0; i < articles.length; i++) {
            sum += articles[i].priceDiscounted && articles[i].priceDiscounted > 0 ? (articles[i].quantity * articles[i].priceDiscounted) : (articles[i].quantity * articles[i].price);
        }

        return parseFloat(sum.toFixed(2));
    }

    return (
        <div className="panier">
            <h2 className="bigTitle">Panier</h2>
            <div className="panier__container">

                {panier.map((cell, index) => (
                    <div className="panier__container__article" key={index} data-id={cell._id}>
                        <div className="panier__container__article__top">
                            <div className="panier__container__article__top__img"><img src={`${HOST}/images/${cell.imgUrl}`} alt="" /></div>
                            <div className="panier__container__article__top__text">
                                <p className="panier__container__article__top__text--name">{cell.name}</p>
                                <p>{cell.category}</p>
                                <p>{cell.gender}</p>
                                <p>{cell.color}</p>
                            </div>
                            <div className="panier__container__article__top__price">{cell.priceDiscounted}€</div>
                        </div>
                        <div className="panier__container__article__bot">
                            <div className="panier__container__article__bot__updatedQuantity">
                                {cell.quantity > 1 ? <i className="fa-solid fa-minus" onClick={(e) => handleMinus(e)}></i> : <i className="fa-solid fa-trash-can" onClick={(e) => handleDelete(e)}></i>} <p className="panier__container__article__bot__quantity" ref={quantityRef}>{cell.quantity}</p><i className="fa-solid fa-plus" onClick={(e) => handlePlus(e)}></i>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="panier__container__total">
                    <p>Total : {total} €</p>
                    <button>Buy</button>
                </div>

            </div>
        </div>
    );
}

