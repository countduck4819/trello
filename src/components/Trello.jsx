import React from "react";
import Loading from "../Loading/Loading";
import ConfigTrello from "./ConfigTrello";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from "react-router-dom";

function Trello() {
    // if (!user) {
    //     loginWithRedirect();
    // }
    // console.log(user);

    return (
        <>
            <ConfigTrello />
        </>
    );
}

export default Trello;
