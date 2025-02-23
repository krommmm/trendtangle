

export function HeaderCardToggle({ articles, backPanier, statePanier }) {

    function handleClick(e) {
        backPanier(!statePanier); 
    }
    return (
        <>
            <div className="header__headerMiddle__card__container__HeaderCardToggle" onClick={(e) => handleClick(e)}>
                <i className="fa-solid fa-cart-shopping headerPanierIcon"></i>
                <div className="header__headerMiddle__card__container__HeaderCardToggle__icons">
                    <p className="header__headerMiddle__card__container__HeaderCardToggle__icons-para">{articles.length}</p>
                </div>
                <p>Your Cart</p>
            </div>


        </>
    );
}