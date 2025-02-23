import { useState, useEffect } from "react";
import { ShowCase } from "./showCase/ShowCase";
import { NewProducts } from "./newProducts/NewProducts";
import { FlashSale } from "./flashSale/FlashSale";
import { getFlashOffer } from "../../services/service_flash";

export function Home() {

    const [flashSale, setFlashSale] = useState([]);

    useEffect(() => {
        getFlashSale();
    }, []);

    async function getFlashSale() {
        const res = await getFlashOffer();
        setFlashSale(res.data.articles);
    }

    return (
        <div className="home">
            <ShowCase />
            <NewProducts />
            {flashSale && flashSale.length > 0 && <FlashSale articles={flashSale} />}
        </div>
    );
}