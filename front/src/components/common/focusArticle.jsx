import { deleteArticle } from "../../services/service_articles";
import { useNavigate } from "react-router-dom";
import { UpdateArticleForm } from "../forms/UpdateArticleForm";
import { useState, useEffect } from "react";
import { usePanier } from "../../context/context_panier";
import { addToPanier } from "../../services/service_panier";
import { handleLike } from "../../services/service_articles";
import { HOST } from "../../global.config";

export function FocusArticle({ article, rights, onUpdate }) {

    const navigate = useNavigate();
    const { panierFlip, togglePanier } = usePanier();
    const [modal, setModal] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    async function handleDelete(e) {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const articleId = e.target.closest(".ficheProduit").dataset.id;
        const response = await deleteArticle(token, articleId);
        console.log(response);
        navigate("/");
    }

    function showUpdateModal() {
        setModal(true)
    }

    async function addPanier(e) {
        console.log("coucou");
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const prePanier = {
            itemId: e.target.closest(".ficheProduit").dataset.id,
            quantity: 1
        }
        const response = await addToPanier(prePanier, token);
        console.log(response);
        togglePanier();
    }

    async function manageLike(e) {
        console.log("coucou");
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const articleId = e.target.closest(".ficheProduit").dataset.id;
        const res = await handleLike(token, articleId);
        console.log(res);
        onUpdate();
    }




    return rights ? (
        <div className="focus">
            <div to={`/focus?articleId=${article._id}`} className="ficheProduit" data-id={article._id}>
                <div className="ficheProduits__manage">
                    <button className="deleteFocusArticle" onClick={(e) => handleDelete(e)}>Delete</button>
                    <button className="updateFocusArticle" onClick={(e) => showUpdateModal(e)}>Update</button>
                </div>

                <div className="ficheProduit__img">
                    <img src={`${HOST}/images/${article.imgUrl}`} alt="img" />
                    {article.isNew && <div className="ficheproduit__img--isNew">New</div>}
                    {(article.discount || article.flash.state === true) && article.priceDiscounted && <div className="ficheProduit__img--discount">-{article.discount}%</div>}

                </div>
                <div className="ficheProduit__text">
                    <p className="ficheProduit__text__category"><span className="article__category">{article.category}</span>&nbsp;<span className="article__gender">{article.gender}</span>&nbsp;<span className="article__color">{article.color}</span></p>
                    <p className="ficheproduit__text__title">{article.name}</p>
                    <p>{article.stock} article(s) left</p>
                    <div className="ficheProduit__text--stars">
                        {[...Array(article.stars || 0)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                        ))}
                    </div>
                    <div className="ficheProduit__text--likes">
                        <i className="fa-solid fa-thumbs-up" onClick={(e) => manageLike(e)}></i><p className="ficheProduit__text--likes--like">{article.likes}</p>
                    </div>

                    <div className="ficheProduit__text__footer">
                        <div className="ficheProduit__text__footer__prices">
                            <p className="ficheProduit__text__footer__prices--price">{article.priceDiscounted}€</p> {article.discount && <p className="ficheProduit__text__footer__prices--oldprice">{article.price}€</p>}
                        </div>
                        <button className="ficheProduit__text__addPanier" onClick={(e) => addPanier(e)}>ADD</button>
                    </div>

                </div>
            </div>
            {modal && (<div className="focus__modal">
                <div className="focus__modal__container">
                    <UpdateArticleForm article={article} closeModal={setModal} onUpdate={onUpdate} />
                </div>
            </div>)}

        </div>
    ) : (
        <div className="focus">
            <div to={`/focus?articleId=${article._id}`} className="ficheProduit" data-id={article._id}>
                <div className="ficheProduit__img">
                    <img src={`${HOST}/images/${article.imgUrl}`} alt="img" />
                    {article.isNew && <div className="ficheproduit__img--isNew">New</div>}
                    {article.discount && <div className="ficheProduit__img--discount">-{article.discount}%</div>}
                </div>
                <div className="ficheProduit__text">
                    <p className="ficheProduit__text__category"><span className="article__category">{article.category}</span>&nbsp;<span className="article__gender">{article.gender}</span>&nbsp;<span className="article__color">{article.color}</span></p>
                    <p className="ficheproduit__text__title">{article.name}</p>
                    <p>{article.stock} article(s) left</p>
                    <div className="ficheProduit__text--stars">
                        {[...Array(article.stars || 0)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                        ))}
                    </div>
                    <div className="ficheProduit__text--likes">
                        <i className="fa-solid fa-thumbs-up" onClick={(e) => manageLike(e)}></i><p className="ficheProduit__text--likes--like">{article.likes}</p>
                    </div>

                    <div className="ficheProduit__text__footer">
                        <div className="ficheProduit__text__footer__prices">
                            <p className="ficheProduit__text__footer__prices--price">{article.priceDiscounted}€</p> <p className="ficheProduit__text__footer__prices--oldprice">{article.price}€</p>
                        </div>
                        {/* <button className="ficheProduit__text__addPanier" onClick={(e) => addPanier(e)}>ADD</button> */}
                    </div>

                </div>
            </div>
        </div>
    )



}