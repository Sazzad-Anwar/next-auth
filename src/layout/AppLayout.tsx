import SignUp from '@/pages/signup';
import { Fetcher } from '@/utils/Fetcher';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    let session = useSession();
    let router = useRouter();
    let { data: userData, isLoading } = useSWR(
        session?.status === 'authenticated' ? '/auth/user' : null,
        Fetcher,
    );

    console.log(Cookies.get('token'), '<== token');

    useEffect(() => {
        if (session?.status === 'authenticated' && !Cookies.get('token')) {
            router.push('/profile/save');
        }
    }, [router, session, userData, isLoading]);

    return <>{children}</>;
}
