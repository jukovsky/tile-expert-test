import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <div
                    className="navbar grow items-center"
                    id="navbarSupportedContentY"
                >
                    <ul className="navbar-nav mr-auto flex">
                        <li className="nav-item">
                            <Link
                                className="nav-link block pr-2 lg:px-2 py-2 text-gray-500 hover:text-gray-800 focus:text-gray-800 transition duration-150 ease-in-out"
                                to="/"
                            >
                                Main
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link block pr-2 lg:px-2 py-2 text-gray-500 hover:text-gray-800 focus:text-gray-800 transition duration-150 ease-in-out"
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
