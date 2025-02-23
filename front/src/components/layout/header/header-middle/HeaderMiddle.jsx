import { HeaderSearchBar } from "./HeaderSearchBar";
import { HeaderCard } from "./Header-card/HeaderCard";
import { useState, useEffect } from "react";
import { isUserConnected } from "../../../../services/service_auth";
import { useUser } from "../../../../context/context_userConnected";

export function HeaderMiddle() {

    const [isConnected, setIsConnected] = useState(false);
    const { user } = useUser();


    useEffect(() => { 
        checkIfUserIsConnected();  
    }, [user]);

    async function checkIfUserIsConnected() {
        const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
        const res = await isUserConnected(token);
        if (!res.ok) {
            setIsConnected(false);
        }else{
            setIsConnected(true);
        }
    }


    return (
        <div className="header__headerMiddle">
            <p className="header__headerMiddle--title">Trendtangle<span className="red">.</span></p>
            <HeaderSearchBar />
            {isConnected && <HeaderCard />} 
        </div>
    );
}