import { HeaderContact } from "./HeaderContact";
import { HeaderAccount } from "./HeaderAccount" 
import { useState } from "react";
import { MiniMenu } from "../../../common/MiniMenu";

export function HeaderTop({isUserAdmin}) {

    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <>
            <div className="header__headerTop">
                <HeaderContact />
                <div className="header__headerTop__right">
                    <HeaderAccount />
                    <div className="miniMenuContainer">
                        <i className="fa-solid fa-bars" onClick={() => setToggleMenu(!toggleMenu)}></i>
                    </div>
                </div>
                {toggleMenu && <MiniMenu isUserAdmin={isUserAdmin} onUpdate={setToggleMenu} />}
            </div>
        </>
    );
}