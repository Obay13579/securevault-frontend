'use client';

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from "@/public/assets/securevault.png";

export default function ProfileEditor() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted', { username, email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#7A1CAC" }}>
            <div className="card bg-base-100 w-96 shadow-xl">
                <Link href="/dashboard" className="absolute top-3 left-3 btn btn-circle btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <figure className="px-40 pt-10">
                    <Image
                        src={Logo}
                        alt="Logo" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl font-bold mb-4">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="w-full">
                        <label className="form-control w-full max-w-xs">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="input input-bordered w-full max-w-xs"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </label>
                        <label className="form-control w-full max-w-xs mt-3">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="input input-bordered w-full max-w-xs"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </label>
                        <label className="form-control w-full max-w-xs mt-3">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="input input-bordered w-full max-w-xs"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </label>
                        <div className="card-actions mt-6">
                            <button type="submit" className="btn btn-neutral w-full">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}