import { Article } from "./Article";
import { useState, useRef, useEffect } from "react";

export function Caroussel({ articles, onUpdate }) {

    const articlesRef = useRef(null);
    const [carrousel, setCarrousel] = useState(0);
    const [articlesUpdateForCarrousel, setArticlesUpdateForCarrousel] = useState([]);
    const [myArticles, setMyArticles] = useState([]);

    let ficheWidth = 260;
    let turn = 0;
    let nbArticlePerVision = 4;
    // modifier le css .newProducts--vision  

    useEffect(() => {
        const articleContainerWidth = articlesRef.current.offsetWidth;
        ficheWidth = Math.floor(articleContainerWidth / nbArticlePerVision);


        // pour tous les articles => 
        if (articles && articles.length > 0) {
            for (let i = 0; i < nbArticlePerVision; i++) {
                articles.push(articles[i]);
                setArticlesUpdateForCarrousel([...articles], articles[0]);
            }
        }

    }, [articles]);

    function turnCarrouselRight(e) {
        articlesRef.current.style.transitionDuration = "1s";
        turn++;
        articlesRef.current.style.transform = `translateX(-${ficheWidth * turn}px)`;

        if (turn === articles.length + 1 - nbArticlePerVision) {
            setTimeout(() => {
                articlesRef.current.style.transitionDuration = "1s";
                turn = 1;
                articlesRef.current.style.transform = `translateX(-${ficheWidth * turn}px)`;
            }, 10);
            articlesRef.current.style.transitionDuration = "0s";
            turn = 0;
            articlesRef.current.style.transform = `translateX(${0}px)`;
            return;
        }
    }

    function turnCarrouselLeft(e) {
        turn--;
        if (turn <= 0) turn = 0;
        articlesRef.current.style.transform = `translateX(-${ficheWidth * turn}px)`;
    }


    return (
        <div className="caroussel">
            {console.log(articlesUpdateForCarrousel)}
            <div className="newProducts--vision">
                <i className="fa-solid fa-angles-left turn turn-left" onClick={(e) => turnCarrouselLeft(e)}></i>
                <i className="fa-solid fa-angles-right turn turn-right" onClick={(e) => turnCarrouselRight(e)}></i>
                <div className="newProducts__fiches" ref={articlesRef}>
                    {articlesUpdateForCarrousel && articlesUpdateForCarrousel.length > 0 && <Article articles={articlesUpdateForCarrousel} onUpdate={onUpdate} />}
                </div>
            </div>
        </div>
    );
}