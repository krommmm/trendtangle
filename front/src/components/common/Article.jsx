
import { NavLink } from "react-router-dom";
import { addToPanier } from "../../services/service_panier";
import { usePanier } from "../../context/context_panier";
import { HOST } from "../../global.config";

export function Article({ articles, onUpdate }) {

    const { panierFlip, togglePanier } = usePanier();

    async function addPanier(e) {
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

    return ( 

        articles.map((article, index) => (
            <div className="ficheProduit" key={index} data-id={article._id}>
                <NavLink to={`/focus?articleId=${article._id}`} className="ficheProduit__img">
                    <img src={`${HOST}/images/${article.imgUrl}`} alt="img" />
                    {article.isNew && <div className="ficheproduit__img--isNew">New</div>}
                    {article.discount && <div className="ficheProduit__img--discount">-{article.discount}%</div>} 

                </NavLink>
                <div className="ficheProduit__text">

                    <p className="ficheproduit__text__title">{article.name}</p>
                    <div className="ficheProduit__text--stars">
                        {[...Array(article.stars || 0)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                        ))}
                    </div>


                    <div className="ficheProduit__text__footer">
                        <button className="ficheProduit__text__addPanier" onClick={(e) => addPanier(e)}>Add</button>
                    </div>

                </div>
            </div>
        ))


    );
};