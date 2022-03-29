import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import Header from "./Header"
import About from "./About"
import Folder from "./Folder"
import PictureLoader from "./PictureLoader"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios"

export default function ReactContainer() {
	const [pages, setPages] = useState([])

	useEffect(() => {
        axios
            .get("/api/page")
            .then((response) => {
                const data = response.data
                if (data.status == 1) {
                    setPages(data.pages)
                }
            })
            .catch((error) => {
                console.log(error)
            });
        return () => {}
    }, [])

    return (
        <BrowserRouter>
            <Header />
            <section className="text-gray-800">
                <div className="container p-10 mx-auto">
                    <div className="lg:flex lg:flex-wrap g-0 block bg-white shadow-lg rounded-lg h-full p-10">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <PictureLoader
                                        pages={pages}
                                        setPages={setPages}
                                    />
                                }
                            />
                            <Route path="/about" element={<About />} />
                            <Route path="/page/:folder" element={<Folder />} />
                        </Routes>
                    </div>
                </div>
            </section>
        </BrowserRouter>
    )
}

if (document.getElementById("react-container")) {
    ReactDOM.render(
        <ReactContainer />,
        document.getElementById("react-container")
    )
}
