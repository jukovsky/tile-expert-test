import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

import PictureCard from "./PictureCard"

export default function Folder() {
    const { folder } = useParams()
	const [images, setImages] = useState([])

	useEffect(() => {
        axios
            .get(`/api/page/${folder}`)
            .then((response) => {
                const data = response.data
                if (data.status == 1) {
                    setImages(data.images)
                }
            })
            .catch((error) => {
                console.log(error)
            });
        return () => {}
    }, []);

    return (
        <div className="lg:w-12/12 px-4 md:px-0">
            <div className="md:p-12 md:mx-6">
                <div className="text-center text-xl font-semibold mt-1 mb-12 pb-1">
                    <span>Parsed images :: </span>
                    <Link className="text-blue-500 hover:text-blue-800" to="/">
                        back
                    </Link>
                </div>

                <div className="flex flex-wrap -m-1 md:-m-2">
                    {images.map((image) => (
                        <PictureCard key={image.key} {...image} />
                    ))}
                </div>
            </div>
        </div>
    );
}
