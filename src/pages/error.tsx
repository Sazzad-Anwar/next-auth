import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Error() {
    let router = useRouter();

    return (
        <div className="bg-gray-800 min-h-screen flex justify-center items-center text-white">
            <div className="w-[320px] mx-auto">
                <h1 className="text-center text-base font-bold">{router.query?.error}</h1>
                <Link
                    href="/login"
                    className="rounded border block text-center w-full mt-5 py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
