import React, { useState } from "react"
import axios from "axios"

import FolderCard from "./FolderCard";

export default function PictureLoader(props) {
	const { pages, setPages } = props
	const [url, setUrl] = useState('')
	const [size, setSize] = useState(200)
	const [formDisabled, setFormDisabled] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleParseClick = (e) => {
		if (formDisabled) {
			return
		}

		setFormDisabled(true);
		axios
            .post("/api/page", {
                url,
                size,
            })
            .then(response => {
				const data = response.data
				if (data.status == 1) {
					setPages([...pages, data.page])
					setShowSuccess(true);
					setTimeout(() => setShowSuccess(false), 2000);
				} else {
					setShowError(true);
					setErrorMessage(data.error)
                    setTimeout(() => setShowError(false), 2000);
				}
			})
            .catch((error) => {
                console.log(error)
            })
			.finally(() => {
				setFormDisabled(false);
			})
	}

	const onSizeChange = (e) => {
		if (!isNaN(+e.target.value)) {
			setSize(e.target.value)
		}
	}

    return (
        <>
            <div className="lg:w-4/12 px-4 md:px-0">
                <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                            Page parsing
                        </h4>
                    </div>

                    <form>
                        <p className="mb-4">
                            Provide page url and minimum size
                        </p>
                        <div className="mb-4">
                            <input
                                disabled={formDisabled}
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="url"
                                name="url"
                                placeholder="Page URL"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                disabled={formDisabled}
                                type="text"
                                value={size}
                                onChange={onSizeChange}
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="size"
                                name="size"
                                placeholder="Size"
                            />
                        </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                            <button
                                disabled={formDisabled}
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 w-full mb-3"
                                onClick={handleParseClick}
                            >
                                Parse
                            </button>
                        </div>
                        {showSuccess && (
                            <div
                                class="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700"
                                role="alert"
                            >
                                Images loaded
                            </div>
                        )}
                        {showError && (
                            <div
                                class="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                                role="alert"
                            >
                                Something went wrong: {errorMessage}
                            </div>
                        )}
                        {formDisabled && (
                            <div className="flex justify-center items-center">
                                <div
                                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                                    role="status"
                                >
                                    <span className="visually-hidden">.</span>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <div className="lg:w-8/12 px-4 md:px-0">
                <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                            Click cover to see all images
                        </h4>
                    </div>

                    <div className="flex flex-wrap -m-1 md:-m-2">
                        {pages.map((page) => (
                            <FolderCard key={page.folder} {...page} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
