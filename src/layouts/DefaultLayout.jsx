import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Chatbot from "../components/Chatbot";


export default function DefaultLayout() {
    return(
        <>
            <AppHeader/>

            
            <Outlet/>
            <Chatbot/>

            <AppFooter/>
        </>
        
    )
}