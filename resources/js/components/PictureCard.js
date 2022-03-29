import React from "react"

export default function PictureCard(props) {
    const image = props;
    return (
        <div className="flex flex-wrap w-1/6">
            <div className="w-full p-1 md:p-2">
                <img alt="gallery" src={image.url} />
            </div>
        </div>
    );
}
