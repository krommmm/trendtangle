import { HOST } from "../../../global.config";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export function FlashSale({ articles }) {

    const [flashDate, setFlashDate] = useState({
        date: articles[0].flash.date,
        format: {
            sec: null,
            min: null,
            hour: null,
            day: null
        }
    })

    useEffect(() => {
        const timer = setInterval(() => {
            convertDate();
        }, 1000);

        return () => clearInterval(timer); // netoyage du timer au cas où on change de page
    }, []);

    function convertDate() {
        const currentDate = new Date().getTime();
        const diff = flashDate.date - currentDate;

        if (diff <= 0) {
            setFlashDate((prev) => ({
                ...prev,
                format: {
                    sec: 0,
                    min: 0,
                    hour: 0,
                    day: 0
                }
            }));
            return;
        }

        const day = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const min = Math.floor((diff / (1000 * 60)) % 60);
        const sec = Math.floor((diff / 1000) % 60);

        setFlashDate((prev) => ({
            ...prev,
            format: { day, hour, min, sec }
        }));
    }



    return (
        <div className="flashSale">
            <div className="flashSale__content">
                <div className="flashSale__content__imgLeft">
                    <img src={`${HOST}/images/${articles[0].imgUrl}`} alt="" />
                </div>
                <div className="flashSale__content__main">
                    <div className="flashSale__content__main__timer">
                        <div className="flashSale__content__main__timer__circle"><span className="flashSale__content__main__timer__circle__time">{flashDate.format.day}</span> Days</div>
                        <div className="flashSale__content__main__timer__circle"><span className="flashSale__content__main__timer__circle__time">{flashDate.format.hour}</span> Hours</div>
                        <div className="flashSale__content__main__timer__circle"><span className="flashSale__content__main__timer__circle__time">{flashDate.format.min}</span> Mins</div>
                        <div className="flashSale__content__main__timer__circle"><span className="flashSale__content__main__timer__circle__time">{flashDate.format.sec}</span> Secs</div>
                    </div>
                    <div className="flashSale__content__main__text">
                        <h3>Hot deal this week</h3>
                        <p>Visit the <span className="flashSale__content__main__text--name">{articles[0].flash.name}</span> sale !!!</p>
                        <p>New Collection Up to <span className="flashSale__content__main__text--sale">{articles[0].flash.sale}</span>% OFF</p>
                    </div>
                    <NavLink to="/HotDeals?page=1"><button>Show now !</button></NavLink>
                </div>
                <div className="flashSale__content__imgRight">
                    <img src={`${HOST}/images/${articles[0].imgUrl}`} alt="" />
                </div>
            </div>
        </div>
    );
}