import { NavLink } from "react-router-dom";

export function MenuDeroulant(props) {

    return (
        <>
            <div className="menuDeroulant">
                <ul>
                    {props.type.values.map((cell, index) => (

                        <NavLink key={index} to={`/${props.type.name}?page=1&${props.type.name}=${cell}`}> 
                            <li>{cell}</li>
                        </NavLink>

                    ))}
                </ul>
            </div>
        </>
    );
}