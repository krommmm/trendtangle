import { Routes, Route } from 'react-router-dom';
import "./assets/css/index.css";
import Footer from "./components/layout/Footer.jsx";
import { Header } from "./components/layout/header/Header.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Auth } from "./pages/auth/Auth.jsx";
import { Admin } from "./pages/admin/Admin.jsx";
import { useState, useEffect } from "react";
import { isUserAdmin } from "./services/service_auth.js";
import { useFlip } from "./context/context_flip.jsx";
import { AdminAdd } from "./pages/admin/AdminAdd.jsx";
import { AdminArticles } from "./pages/admin/AdminArticles.jsx";
import { AdminNavBar } from "./pages/admin/AdminNavBar.jsx";
import { HotDeals } from "./pages/hotDeals/HotDeals.jsx";
import { NewProducts } from "./pages/newProducts/NewProducts.jsx";
import { Category } from "./pages/category/Category.jsx";
import { Color } from "./pages/category/Color.jsx";
import { Gender } from "./pages/category/Gender.jsx";
import { Focus } from "./pages/focus/Focus.jsx";
import { Panier } from "./pages/panier/Panier.jsx";
import { AdminFlash } from './pages/admin/AdminFlash.jsx';
import { SearchProduct } from './pages/SearchedProduct/SearchProduct.jsx';
import { AllProducts } from './pages/allProducts/AllProducts.jsx';

function App() {
    const { toggleFlip } = useFlip();
    const [isUserAdminToggle, setIsUserAdminToggle] = useState(false);

    useEffect(() => {
        async function verifyIfUserIsAdmin() {
            const token = JSON.parse(localStorage.getItem("trendtangle-auth-token"));
            if (token) {
                const isUserRlyAdmin = await isUserAdmin(token);
                setIsUserAdminToggle(isUserRlyAdmin.isAdmin);
            }
        }
        verifyIfUserIsAdmin();
    }, [toggleFlip]);

    return (
        <div className="app">
            <Header isUserAdmin={isUserAdminToggle} />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {isUserAdminToggle && <Route path="/admin" element={<Admin isUserAdminToggle={isUserAdminToggle} />} />}
                    {isUserAdminToggle && <Route path="/adminAdd" element={<AdminAdd isUserAdminToggle={isUserAdminToggle} />} />}
                    {isUserAdminToggle && <Route path="/adminArticles" element={<AdminArticles isUserAdminToggle={isUserAdminToggle} />} />}
                    {isUserAdminToggle && <Route path="/adminFlash" element={<AdminFlash isUserAdminToggle={isUserAdminToggle} />} />}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/hotdeals" element={<HotDeals />} />
                    <Route path="/newProducts" element={<NewProducts />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/gender" element={<Gender />} />
                    <Route path="/color" element={<Color />} />
                    <Route path="/focus" element={<Focus />} />
                    <Route path="/panier" element={<Panier />} />
                    <Route path="/searchedProducts" element={<SearchProduct />} />
                    <Route path="/allProducts" element={<AllProducts />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;