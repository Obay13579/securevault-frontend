'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from "@/public/assets/securevault.png";

export default function ProfileEditor() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            
            if (token && userData.id) {
                try {
                    const response = await fetch(`https://securevault-backend-plum.vercel.app/api/users/${userData.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username);
                        setEmail(data.email);
                        setUserId(data.id);
                    } else {
                        setError('Failed to fetch user data');
                    }
                } catch (error) {
                    setError('Error fetching user data');
                }
            }
        };

        fetchUserData();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('https://securevault-backend-plum.vercel.app/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                setSuccessMessage('Profile updated successfully');
                // Update local storage with new data
                const userData = { id: userId, username, email };
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            setError('An error occurred while updating the profile');
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            const token = localStorage.getItem('token');
            
            try {
                const response = await fetch('https://securevault-backend-plum.vercel.app/api/users/delete', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                    router.push('/auth/login');
                } else {
                    const data = await response.json();
                    setError(data.message || 'Failed to delete account');
                }
            } catch (error) {
                setError('An error occurred while deleting the account');
            }
        }
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
                    {error && <p className="text-error text-sm">{error}</p>}
                    {successMessage && <p className="text-success text-sm">{successMessage}</p>}
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
                                placeholder="New Password (leave blank to keep current)" 
                                className="input input-bordered w-full max-w-xs"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <div className="card-actions mt-6">
                            <button type="submit" className="btn btn-neutral w-full">Save Changes</button>
                        </div>
                    </form>
                    <div className="mt-6 w-full">
                        <button onClick={handleDeleteAccount} className="btn btn-error w-full">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}