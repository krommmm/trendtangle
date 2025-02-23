import { Article } from "./Article";
import { useState, useRef, useEffect } from "react";

export function Caroussel({ articles, onUpdate }) {

    const articlesRef = useRef(null);
    const containerRef = useRef(null);
    const [myArticles, setMyArticles] = useState([]);

    let ficheWidth = 260;
    let turn = 0;
    let nbArticlePerVision = 4;
    // modifier le css .newProducts--vision  


    useEffect(() => {
        if (articles && articles.length > 0) setMyArticles(articles);
        if (articles && articles.length > 0) createClones();
        updateVisionWidth();
    }, [articles]);


    function updateVisionWidth() {
        const articleContainerWidth = articlesRef.current.offsetWidth;
        ficheWidth = Math.floor(articleContainerWidth / nbArticlePerVision);
        if (articles.length === 3) {
            containerRef.current.style.width = "777px";
        } else if (articles.length === 2) {
            containerRef.current.style.width = "504px";
        } else if (articles.length === 1) {
            containerRef.current.style.width = "263px";
        }
    }

    function createClones() {
        for (let i = 0; i < 4; i++) {
            setMyArticles(prevState => ([...prevState, prevState[i]]));
        }
    }

    function turnCarrouselRight(e) {
        articlesRef.current.style.transitionDuration = "1s";
        turn++;
        articlesRef.current.style.transform = `translateX(-${ficheWidth * turn}px)`;
        if (turn === myArticles.length + 1 - nbArticlePerVision) {
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
            <div className="newProducts--vision" ref={containerRef}>
                <i className="fa-solid fa-angles-left turn turn-left" onClick={(e) => turnCarrouselLeft(e)}></i>
                <i className="fa-solid fa-angles-right turn turn-right" onClick={(e) => turnCarrouselRight(e)}></i>
                <div className="newProducts__fiches" ref={articlesRef}>
                    <Article articles={myArticles} onUpdate={onUpdate} />
                </div>
            </div>
        </div>
    );
}