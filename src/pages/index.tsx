import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { signOut, useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

export default function Home() {
    let session = useSession();

    return (
        <div className="bg-gray-800 min-h-screen">
            <Head>
                <title>Next Auth</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-gray-800 min-h-screen flex justify-center items-center text-white">
                <div className="w-[320px] mx-auto">
                    <h1 className="text-white text-xl font-bold text-center mb-3">
                        Next auth user
                    </h1>
                    <div className="flex items-center ring-2 ring-blue-800 rounded">
                        <Image
                            src={
                                session.data?.user?.image ??
                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                            }
                            height={80}
                            width={80}
                            alt={session.data?.user?.name ?? 'guest-user'}
                        />
                        <div className="ml-3 text-left p-2">
                            <p className="text-lg font-bold mb-0">
                                {session.data?.user?.name ?? 'Guest User'}
                            </p>
                            <p className="text-sm font-medium mt-0">
                                {session.data?.user?.email ?? 'example@email.com'}
                            </p>
                        </div>
                    </div>
                    {session?.data?.user ? (
                        <button
                            onClick={() => signOut()}
                            className="rounded border w-full mt-3 px-5 py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900 flex items-center justify-center"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded border mt-3 px-5 py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900 flex items-center justify-center"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     };
    // }
    return {
        props: { session },
    };
};