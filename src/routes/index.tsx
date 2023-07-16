import { Route, Routes } from "react-router-dom";
import { Search } from "../screens/Search";



export function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Search/>} />
        </Routes>
    )
}