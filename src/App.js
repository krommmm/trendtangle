import { Routes, Route } from 'react-router-dom';
import './assets/css/index.css';
import Menu from './components/utils/Menu';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import WishList from './components/pages/WishList';
import Basket from './components/pages/Basket';
import HotDeals from './components/pages/HotDeals';
import Category from './components/pages/Category';
import NewProducts from './components/pages/NewProducts';
import Footer from './components/utils/Footer';
import { useState, useEffect } from 'react';
import { isAdmin } from './services/isAdmin';
import Admin from './components/pages/Admin';
import ModifyArticle from "./components/pages/ModifyArticle";
import Gender from "./components/pages/Gender";
import Color from "./components/pages/Color";
import SearchedProducts from "./components/pages/SearchedProducts";
import PreBasket from "./components/pages/PreBasket";

function App() {
	const [isAdministrator, setIsAdministrator] = useState(false);
	const [toggle, setToggle] = useState(true);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem('token'));
		if (token !== null && token !== undefined && token !== 'undefined') {
			checkIfIsAdmin(token);
		}else{
			localStorage.removeItem("token");
		}
	}, [toggle]);

	async function checkIfIsAdmin(token) {
		const res = await isAdmin(token);
		if (res.msg === 'success') {
			setIsAdministrator(true);
		} else {
			setIsAdministrator(false);
		}
	}

	return (
		<>
			<Menu isAdmin={isAdministrator} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/adminmod" element={<Admin />} />
				<Route
					path="/auth"
					element={<Auth remonterToApp={setToggle} />}
				/>
				<Route path="/WishList" element={<WishList />} />
				<Route path="/PreBasket" element={<PreBasket />} />
				<Route path="/Basket" element={<Basket />} />
				<Route path="/HotDeals" element={<HotDeals />} />
				<Route path="/Category" element={<Category />} />
				<Route path="/Gender" element={<Gender />} />
				<Route path="/Color" element={<Color />} />
				<Route path="/NewProducts" element={<NewProducts />} />
				<Route path="searchedProducts" element={<SearchedProducts/>} />
			
				<Route path="/modify" element={<ModifyArticle />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
