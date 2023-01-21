import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = {
                    id: crypto.randomUUID(),
                    name: credentials?.email.split('@')[0],
                    email: credentials?.email,
                    image: 'https://lh3.googleusercontent.com/a/AEdFTp6YC4TOaqCCXBisSB9W0mGx0pLhudS29KErj9j_ww=s96-c',
                };

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
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
        session({ session, token, user }) {
            session.user.token = token.id_token;
            console.log(user);
            return session; // The return type will match the one returned in `useSession()`
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.id_token = account.id_token;
            }
            return token;
        },
        async signIn({ account, profile }) {
            if (account?.provider === 'google') {
                try {
                    let { data } = await axios.post('https://dev-api.indozone.id/auth/login', {
                        type: 'google',
                        identifier: account?.id_token,
                    });
                    if (data.response === true) {
                        console.log(data.message);
                        return false;
                    } else {
                        return true;
                    }
                } catch (error: any) {
                    console.log(error.response.message);
                    return false;
                }
            }
            return true;
            // Do different verification for other providers that don't have `email_verified`
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/error',
    },
});
