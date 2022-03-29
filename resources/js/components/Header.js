import React from "react";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <header>
            <Navigation />
            <div className="text-center bg-gray-50 text-gray-800 py-5 px-6">
                <h1 className="text-5xl font-bold mt-0 mb-6">
                    Test for tile expert
                </h1>
            </div>
        </header>
    );
}
