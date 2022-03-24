import React from "react";
import ReactDOM from "react-dom";

export default function ReactContainer() {
    return <h1>Hello React!</h1>;
}

if (document.getElementById("react-container")) {
    ReactDOM.render(
        <ReactContainer />,
        document.getElementById("react-container")
    );
}