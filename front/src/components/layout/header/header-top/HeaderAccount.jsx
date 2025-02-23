import { NavLink } from 'react-router-dom';
import { useState } from "react";

export function HeaderAccount() {

    const [isConnected, setIsConnected] = useState(false);

    function handleDisconnect() {
        localStorage.removeItem('token');
        setIsConnected(false);
        window.location.reload();
    }

    return (
        <>
            <div className="header__headerTop__account">
                <ul>
                    <li>
                        <NavLink aria-label="" to="/auth">
                            <i className="fa-solid fa-user"></i>My
                            account
                        </NavLink>
                    </li>
                    {isConnected && (
                        <li onClick={handleDisconnect}>
                            <i className="fa-solid fa-user-slash"></i>
                            Disconnect
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}