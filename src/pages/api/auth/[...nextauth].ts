import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import Cookies from 'js-cookie';
import api from '@/utils/AxiosInstance';
import { IUser } from '@/interfaces/user';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    return await NextAuth(req, res, {
        providers: [
            CredentialsProvider({
                // The name to display on the sign in form (e.g. "Sign in with...")
                name: 'Credentials',
                // `credentials` is used to generate a form on the sign in page.
                // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    identifier: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                    password: { label: 'Password', type: 'password' },
                },
                async authorize(credentials, req) {
                    // Add logic here to look up the user from the credentials supplied
                    try {
                        const { data: userData } = await api.post(
                            'https://dev-api.indozone.id/auth/login',
                            {
                                identifier: credentials?.identifier,
                                password: credentials?.password,
                            },
                        );

                        if (userData?.response?.email) {
                            // Any object returned will be saved in `user` property of the JWT
                            let user: IUser = {
                                ...userData.response,
                                name:
                                    userData?.response?.firstName +
                                    ' ' +
                                    userData?.response?.lastName,
                                image: userData?.response?.avatar,
                            };
                            Cookies.set('token', userData?.response?.token, {
                                expires: 7,
                            });
                            return user;
                        } else {
                            // If you return null then an error will be displayed advising the user to check their details.
                            throw new Error(JSON.stringify(userData?.message));

                            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                        }
                    } catch (error: any) {
                        // console.log(error?.data?.message ?? error?.message);
                        throw new Error(error?.data?.message ?? error?.message);
                    }
                },
            }),
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            }),
            FacebookProvider({
                clientId: process.env.FACEBOOK_CLIENT_ID!,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            }),
        ],
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            async signIn({ account, profile, user, credentials, email }) {
                console.log(account?.id_token);
                if (account?.provider === 'google') {
                    try {
                        let { data } = await api.post('https://dev-api.indozone.id/auth/login', {
                            type: 'google',
                            identifier: account?.id_token,
                        });
                        if (data?.response?.id) {
                            Cookies.set('token', data?.response?.token, {
                                expires: 7,
                            });
                        }
                        return true;
                    } catch (error: any) {
                        console.log(error);
                        throw new Error(error?.message);
                    }
                }
                return true;
            },
        },
        pages: {
            signIn: '/login',
            signOut: '/',
            error: '/error',
            newUser: '/set-profile',
        },
    });
}
