import {BrowserRouter, Routes, Route} from "react-router" ; 
import PageComponent from "./pages/page-component";
import LayoutMain from "./pages/layout-main";
import PageHome from "./pages/page-home";
import PagePhotoDetails from "./pages/page-photo-details";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query" ; 

const queryClient = new QueryClient() ; 

export default function App() { 
	return (
		<QueryClientProvider client={queryClient}>
		<BrowserRouter>
		<Routes>
			<Route element={<LayoutMain/>}>
			<Route index element={<PageHome/>}/>
			<Route path="/fotos/:id" element={<PagePhotoDetails/>}/>
			<Route path="/components" element={<PageComponent/>}/>
			</Route>
		</Routes>
		</BrowserRouter>
		</QueryClientProvider>
	); 
}

