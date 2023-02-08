import { createBrowserRouter } from "react-router-dom";
import AccPost from "../components/AccPost";
import Home from "../components/Home";
import Main from './../Layouts/Main';

export const routes = createBrowserRouter([{
    path: '/',
    element: <Main/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/account',
            element: <AccPost/>
        }
    ]
}])