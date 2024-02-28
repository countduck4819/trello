import React from "react";
import "./assets/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import theme from "./theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Auth0Provider } from "@auth0/auth0-react";
import {
    RouterProvider,
    createBrowserRouter,
    useLoaderData,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Header from "./components/Header.jsx";
import Trello from "./components/Trello.jsx";
import Login from "./Login/Login.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/trelloapp",
        element: <Login />,
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Auth0Provider
        domain="dev-jc0jm574owm6kigd.us.auth0.com"
        clientId="GEkVgJBFdRL5Ru0Str4sQZgxF9XK4JQA"
        authorizationParams={{
            redirect_uri: `${window.location.origin}/trelloapp`,
        }}
    >
        {console.log(window.location.origin)}
        <CssVarsProvider theme={theme}>
            <Provider store={store}>
                <RouterProvider router={router} />
                <CssBaseline />
                <App />
                <ToastContainer />
            </Provider>
        </CssVarsProvider>
    </Auth0Provider>
    // </React.StrictMode>
);
