import React, { useEffect, useState } from "react";
import "./style.scss";
import { fetchInput, getApiKey } from "../middleware/inputMiddleware";
import { useDispatch } from "react-redux";
import { client } from "../js/config/client";
import Trello from "../components/Trello";
import Headers from "../components/Headers";
import { Box, Container } from "@mui/material";
import BoardBar from "../components/BoardBar/BoardBar";
import { redirect, useParams, useRouteError } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";

function Login() {
    const [checkData, setCheckData] = useState(false);
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    console.log(isAuthenticated);
    // if (isLoading) {
    //     return <Loading />;
    // }
    // const [loading, setLoading] = useState(false);
    // const [checkIn, setCheckIn] = useState(true);
    // // const [inputText, setInputText] = useState("");
    // const [checkApiKey, setCheckApiKey] = useState(true);
    // // const handleChange = function (e) {
    // //     setInputText(e.target.value);
    // // };

    // async function Loading() {
    //     if (localStorage.getItem("apiKey") && checkApiKey === true) {
    //         setCheckApiKey(false);
    //         // setCheckIn(true);
    //         setLoading(true);
    //         client.setApiKey(JSON.parse(localStorage.getItem("apiKey")));
    //         await dispatch(await getApiKey());
    //         setLoading(false);
    //     }
    // }

    const handleSubmit = async function () {
        // Loading();
        // e.preventDefault();
        // const pattern = /^[0-9a-zA-Z._-]+@[a-z]+\.[0-9a-zA-Z._-]{2,}$/;
        // if (pattern.test(inputText)) {
        // setLoading(true);
        // if (checkData === false) {
        await dispatch(await fetchInput());
        await dispatch(await getApiKey());
        // }
        await setCheckData(true);
        setLoading(false);
        // setLoading(false);
        // setCheckIn(true);
        // setCheckApiKey(false);
        // } else {
        //     console.log("yeu cau nhap lai");
        // }
        // setInputText("");
    };
    // setCheckIn(true);
    if (checkData === false && isAuthenticated) {
        // setLoading(true)
        handleSubmit();
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                isAuthenticated && (
                    <>
                        <Container
                            disableGutters
                            maxWidth={false}
                            sx={{
                                height: "100vh",
                                backgroundColor: (theme) => {
                                    return theme.palette.mode === "dark"
                                        ? "#2c3e50"
                                        : "#1565c0";
                                },
                            }}
                        >
                            <Box
                                px={2}
                                sx={{
                                    // color: "primary.light",
                                    width: "100%",
                                    height: (theme) =>
                                        theme.trello.appBarHeight,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    backgroundColor: (theme) => {
                                        return theme.palette.mode === "dark"
                                            ? "#333"
                                            : "#1565c0";
                                    },
                                }}
                            >
                                <Headers user={user} />
                            </Box>
                            <Box
                                px={2}
                                sx={{
                                    width: "100%",
                                    height: (theme) =>
                                        theme.trello.boardBarHeight,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 2,
                                    overflowX: "auto",
                                    borderBottom: "1px solid white",
                                    backgroundColor: (theme) => {
                                        return theme.palette.mode === "dark"
                                            ? "#444"
                                            : "#1976d2";
                                    },
                                }}
                            >
                                <BoardBar user={user}></BoardBar>
                            </Box>
                            <Box
                                sx={{
                                    // backgroundColor: "primary.main",
                                    width: "100vw",
                                    height: (theme) =>
                                        `calc(100vh - ${theme.trello.boardBarHeight} - ${theme.trello.appBarHeight})`,
                                    display: "flex",
                                    alignItems: "center",
                                    bgcolor: (theme) => {
                                        return theme.palette.mode === "dark"
                                            ? "#444"
                                            : "#1976d2";
                                    },
                                }}
                            >
                                <Trello
                                    user={user}
                                    // checkIn={checkIn}
                                    // loading={loading}
                                    // reload={reload}
                                />
                            </Box>
                        </Container>
                    </>
                )
            )}
        </>
    );
}

export default Login;
