import React from "react"
import { Link } from "react-router-dom";

export default function FolderCard(props) {
	const page = props
    return (
        <div className="flex flex-wrap w-1/3">
            <div className="w-full p-1 md:p-2 hover:opacity-80">
                <Link to={`/page/${page.folder}`}>
                    <img
                        alt="gallery"
                        src={page.cover}
                    />
                </Link>
            </div>
        </div>
    );
}
