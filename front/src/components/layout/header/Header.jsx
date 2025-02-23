import { HeaderTop } from "./header-top/HeaderTop.jsx";
import { HeaderMiddle } from "./header-middle/HeaderMiddle.jsx";
import { Navigation } from "./header-bottom/Navigation.jsx";

export function Header({isUserAdmin}) {

    return (
        <section className="header"> 
            <HeaderTop isUserAdmin={isUserAdmin}/>
            <HeaderMiddle />
            <Navigation isUserAdmin={isUserAdmin}/> 
        </section>
    )
}  