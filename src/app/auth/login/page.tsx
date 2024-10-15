"use client";

import React, { useState } from 'react';
import Logo from "@/public/assets/securevault.png";
import Image from 'next/image';
import Link from 'next/link';
import { loginUser, getAuthenticatedUser } from "@/utils/api";  
import { useMutation } from "@tanstack/react-query";
import useStore from '@/utils/api'; 
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setAccessToken = useStore((state) => state.setAccessToken);
    const setUsername = useStore((state) => state.setUsername);
    const router = useRouter();

    const { mutate: login, isLoading } = useMutation(loginUser, {
        onSuccess: async (data) => {
            console.log(data);
            const { accessToken } = data.data; 
            setAccessToken(accessToken); 
    
            try {
                const user = await getAuthenticatedUser(); 
                if (user) {
                    const { username } = user; 
                    setUsername(username); 
                    console.log(username); 
                    toast.success('Login successful!');
                    router.push('/dashboard');  
                } else {
                    console.error("User object is undefined.");
                    toast.error("User data could not be retrieved.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error('Failed to fetch user data after login.');
            }
        },
        onError: (error) => {
            toast.error('Login failed. Please check your credentials.');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login({ email, password }); 
    };

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <Link href="/" className="absolute top-3 left-3 btn btn-circle btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <figure className="px-40 pt-10">
                    <Image src={Logo} alt="Logo" />
                </figure>
                <div className="card-body items-center text-center">
                    <form onSubmit={handleSubmit} className="w-full">
                        <label className="form-control w-full max-w-xs">
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                        <label className="form-control w-full max-w-xs mt-3">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <div className="label">
                                <Link href="/auth/register" className="link link-hover">
                                    <span className="text-gray-300 label-text-alt text-sm">Didn&apos;t have an account ?</span>
                                </Link>
                            </div>
                        </label>
                        <div className="card-actions">
                            <button type="submit" className={`btn btn-neutral ${isLoading ? 'loading' : ''}`}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
