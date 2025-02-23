import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { FlipProvider } from './context/context_flip.jsx';
import { PanierProvider } from "./context/context_panier.jsx";
import { UserProvider } from "./context/context_userConnected.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<FlipProvider>
			<UserProvider>
				<PanierProvider>
					<App />
				</PanierProvider>
			</UserProvider>
		</FlipProvider>
	</BrowserRouter>
)
