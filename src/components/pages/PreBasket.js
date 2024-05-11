import { getPanier, modifyBasket } from '../../services/servicePanier';
import { useState, useEffect, useRef } from 'react';
import { useFlip } from '../../FlipContext';
import Basket from "./Basket";
import Home from "./Home";

const Prebasket = () => {

    const { flip } = useFlip();
	const [panier, setPanier] = useState([]);
	const [total, setTotal] = useState();
	const [totalPrice, setTotalPrice] = useState(0);
	const [toggle, setToggle] = useState(false);
    const [isPanierEmpty, setIsPanierEmpty] = useState();


	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token'));
		getPanier(token)
			.then((res) => {
				
				setPanier(res.articles);
				setTotal(res.totalPrice);
				//console.log(res);
				if (res.totalPrice === 0) {
					setIsPanierEmpty(false);
				}else{
                    setIsPanierEmpty(true);
                }
				let cumul = 0;
				for(let i=0;i<res.articles.length;i++){
					cumul += (parseFloat(res.articles[i].price)*(1-(parseFloat(res.articles[i].discount))/100)*parseFloat(res.articles[i].quantity));
				}
				setTotalPrice(cumul);
			})
			.catch((err) => console.error(err));
	}, [flip]);

    return (
        <>
            {isPanierEmpty && <Basket panier={panier} totalprice={totalPrice}/>}
            {!isPanierEmpty &&  <Home />}
        </>
    );
};
export default Prebasket;