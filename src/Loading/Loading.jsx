import React from "react";
import "./Loading.scss"
function Loading() {
    return (
        <div className="loading">
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </div>
    );
}

export default Loading;
