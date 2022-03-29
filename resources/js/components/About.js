import React from "react";

export default function About() {
    return (
        <>
            <div>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    Test task for the position of PHP developer.
                </p>
                <p className="text-base font-bold leading-relaxed mt-0 mb-4 text-gray-800">
                    Requirements:
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - create a web application
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - the user should be able to enter the page URL and the
                    minimum image size
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - the script should parse the page at the specified address,
                    find images no smaller than the specified size, and save
                    them
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - when saving, the images should be reduced in height to
                    200px, and then cropped in width to 200px as well
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - the page should display previously uploaded images
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - all interactions with the server part should occur without
                    reloading the page
                </p>
                <p className="text-base font-bold leading-relaxed mt-0 mb-4 text-gray-800">
                    Realization:
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - Laravel for backend
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - ReactJS for frontend
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - S3 storage for pictures
                </p>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-gray-800">
                    - Tools: VS Code, composer, yarn
                </p>
            </div>
        </>
    );
}
