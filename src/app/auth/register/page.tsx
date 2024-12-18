"use client";

import React, { useState } from 'react';
import Logo from "@/public/assets/securevault.png";
import Image from 'next/image';
import Link from 'next/link';
import { registerUser } from "@/utils/api";  
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { mutate: register, isLoading } = useMutation(registerUser, {
    onSuccess: async (data) => {
      console.log(data);
      router.push('/auth/login');  
    },
    onError: (error) => {
      toast.error('Registration failed. Please try again.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ username, email, password });
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
          <Image
            src={Logo}
            alt="Logo"
          />
        </figure>
        <div className="card-body items-center text-center">
          <form onSubmit={handleSubmit} className="w-full">
            <label className="form-control w-full max-w-xs">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input input-bordered w-full max-w-xs mt-3"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs mt-3"
              />
              <div className="label">
                <Link href="/auth/login" className="link link-hover">
                  <span className="text-gray-300 label-text-alt text-sm">Already have an account?</span>
                </Link>
              </div>
            </label>
            <div className="card-actions">
              <button type="submit" className={`btn btn-neutral ${isLoading ? 'loading' : ''}`}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
