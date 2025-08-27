import {BrowserRouter, Routes, Route} from "react-router" ; 
import PageComponent from "./pages/page-component";
import LayoutMain from "./pages/layout-main";
import PageHome from "./pages/page-home";
import PagePhotoDetails from "./pages/page-photo-details";

export default function App() { 
	return (
		<BrowserRouter>
		<Routes>
			<Route element={<LayoutMain/>}>
			<Route index element={<PageHome/>}/>
			<Route path="/fotos/:id" element={<PagePhotoDetails/>}/>
			<Route path="/components" element={<PageComponent/>}/>
			</Route>
		</Routes>
		</BrowserRouter>
	); 
}

