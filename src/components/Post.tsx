import { IPost, IPostUser } from '@/interfaces/post';
import React from 'react';

export default function Post({ post, users }: { post: IPost; users: IPostUser[] }) {
    if (!post) {
        return (
            <div className="rounded-md px-4 py-3 bg-gray-900 text-white mb-3">
                <div className="w-[4ch] h-5 bg-gray-800 mb-2 rounded" />
                <div className="w-[50ch] h-6 bg-gray-800 mb-2 rounded" />
                <div className="mt-5">
                    <div className="w-[50ch] h-6 bg-gray-800 mb-2 rounded" />
                    <div className="w-[50ch] h-6 bg-gray-800 mb-2 rounded" />
                    <div className="w-[25ch] h-6 bg-gray-800 mb-2 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md p-5 bg-gray-900 text-white mb-3">
            <h1 className="text-lg mb-1">#{post.id}</h1>
            <div className="flex items-center my-3">
                <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-800 text-white uppercase ring-2 text-sm">
                    {users[post.userId].name.split(' ')[0].split('')[0]}{' '}
                    {users[post.userId].name.split(' ')[1].split('')[0]}
                </div>
                <h1 className="ml-3 text-2xl">{users[post.userId].name}</h1>
            </div>
            <h2 className="text-xl mb-2 capitalize">{post.title}</h2>
            <p className="text-base capitalize italic font-semibold line-clamp-3">{post.body}</p>
        </div>
    );
}
