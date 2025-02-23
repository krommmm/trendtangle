import { HeaderCardToggle } from "./HeaderCardToggle";
import { HeaderPanierMiniature } from "./HeaderPanierMiniature";
import { useEffect, useState } from "react";
import { articlesByPanier } from "../../../../../services/service_articles";
import { getOnePanier } from "../.././../../../services/service_panier";
import { usePanier } from "../../../../../context/context_panier";

export function HeaderCard() {

    const [panier, setPanier] = useState([]);
    const [openPanier, setOpenPanier] = useState(false);
    const { panierFlip, togglePanier } = usePanier(); 

    useEffect(() => {
        getMyPanier();
    }, [openPanier, panierFlip]);

    async function getMyPanier() {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const response = await articlesByPanier(token);
        const articles = response.data.articles;
        if(!articles) return;

        const prePanier = await getOnePanier(token);
        const panier = prePanier.data.panier;
        const panierIds = panier.items;

        // ajout de la quantité pour chaque article  
        const articlesWithQuantity = [];
        for (let i = 0; i < articles.length; i++) {
            for (let j = 0; j < panierIds.length; j++) {
                if (articles[i]._id === panierIds[j].itemId) {
                    articlesWithQuantity.push({ ...articles[i], quantity: panierIds[j].quantity })
                }
            }
        }

        // calcul du prix avec reduction pour chaque article
        for (let i = 0; i < articlesWithQuantity.length; i++) {
            if (articlesWithQuantity[i].discount && articlesWithQuantity[i].discount > 0) {
                const priceDiscounted = parseFloat(articlesWithQuantity[i].price * (1 - (articlesWithQuantity[i].discount / 100)));
                articlesWithQuantity[i].priceDiscounted = Number(priceDiscounted.toFixed(2));
            }
        }

        setPanier(articlesWithQuantity);
    }

    return ( 
        <div className="header__headerMiddle__card">
            <div className="header__headerMiddle__card__container">
                <HeaderCardToggle articles={panier} backPanier={setOpenPanier} statePanier={openPanier} />
                {openPanier && <HeaderPanierMiniature articles={panier} onUpdate={getMyPanier} backPanier={setOpenPanier} statePanier={openPanier} />}
            </div>
        </div>
    );
}
