import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function HeaderSearchBar() {

    const [searchedValue, setSearchedValue] = useState('');
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        setSearchedValue(e.target.value);
    }

    function searchProduct(e) {
        e.preventDefault();
        e.target.reset();
        navigate(`/searchedProducts?searchedArticles=${searchedValue}`);
    }

    return (

        <div className="header__headerMiddle__searchBar" onSubmit={(e) => searchProduct(e)}>
            <form id="form_searchBar" method="POST">
                <input type="text" onChange={(e) => handleSearch(e)} />

                <button type="sumbit">Search</button>

            </form>
        </div>
    );
}