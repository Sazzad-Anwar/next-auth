import React from 'react';

export default function Loader() {
    return (
        <div className="bg-gray-800 min-h-screen flex justify-center items-center text-white">
            <div className="w-[320px] mx-auto">
                <h1 className="text-center text-2xl font-bold">Loading...</h1>
            </div>
        </div>
    );
}
