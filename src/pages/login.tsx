import Loader from '@/components/Loader';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';

type LoginFormType = {
    email: string;
    password: string;
};

const resolver: Resolver<LoginFormType> = async (values) => {
    return {
        values: values.email && values.password ? values : {},
        errors: !values.email
            ? {
                  email: {
                      type: 'required',
                      message: 'This is required.',
                  },
              }
            : !values.password
            ? {
                  password: {
                      type: 'required',
                      message: 'This is required.',
                  },
              }
            : {},
    };
};

export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const session = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({ resolver });

    const onSubmit = handleSubmit(async (data) => {
        try {
            let loginData = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: 'http://localhost:3000',
            });
            if (loginData?.ok) {
                router.push('/');
            }
            if (loginData?.error) {
                console.log(loginData?.error);
            }
        } catch (error) {
            console.log(error);
        }
    });

    const googleLogin = async () => {
        try {
            await signIn('google', { callbackUrl: 'http://localhost:3000' });
        } catch (error) {
            console.log(error);
        }
    };

    const facebookLogin = async () => {
        try {
            await signIn('facebook', { callbackUrl: 'http://localhost:3000' });
        } catch (error) {
            console.log(error);
        }
    };

    if (session?.status === 'authenticated') {
        router.push('/');
    }
    if (session?.status === 'unauthenticated') {
        return (
            <div className="bg-gray-800 min-h-screen flex justify-center items-center text-white">
                <div className="w-[320px] mx-auto">
                    <h1 className="text-center text-2xl font-bold">Next Auth Login</h1>
                    <form onSubmit={onSubmit} className="w-full my-3">
                        <div className="mb-5">
                            <input
                                type="email"
                                {...register('email', {})}
                                className={
                                    (errors?.email?.message
                                        ? 'border-red-500'
                                        : 'border-blue-500') +
                                    ' rounded border-2 py-3 px-3 w-full outline-none text-gray-900'
                                }
                                placeholder="Email"
                            />
                            {errors?.email && (
                                <p className="text-red-500 font-semibold mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-5 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className={
                                    (errors?.password?.message
                                        ? 'border-red-500'
                                        : 'border-blue-500') +
                                    ' rounded border-2 py-3 px-3 w-full outline-none text-gray-900'
                                }
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-900"
                            >
                                {showPassword ? 'hide' : 'show'}
                            </button>
                            {errors?.password && (
                                <p className="text-red-500 font-semibold mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-5">
                            <button className="rounded border w-full py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center">
                        <div className="w-full h-px bg-gray-200 rounded mt-px" />
                        <span className="text-white font-bold text-base px-2">or</span>
                        <div className="w-full h-px bg-gray-200 rounded mt-px" />
                    </div>

                    <button
                        onClick={() => googleLogin()}
                        className="mt-3 rounded border w-full py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900 flex items-center justify-center"
                    >
                        <Image src="/images/google.svg" height={18} width={18} alt="google-icon" />
                        <span className="ml-2">Login with google</span>
                    </button>

                    <button
                        onClick={() => facebookLogin()}
                        className="mt-3 rounded border w-full py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900 flex items-center justify-center"
                    >
                        <Image
                            src="https://img.icons8.com/fluency/512/facebook-new.png"
                            height={24}
                            width={24}
                            alt="facebook-icon"
                        />
                        <span className="ml-2">Login with facebook</span>
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-3 text-center rounded border w-full py-3 border-blue-500 bg-blue-800 text-white hover:bg-blue-900"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return <Loader />;
}
