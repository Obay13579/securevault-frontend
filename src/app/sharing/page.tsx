"use client"

import React from 'react';
import Link from "next/link"
import Image from "next/image"
import HomeLogin from "@/components/buttons/HomeLogin"
import Pp from "@/public/assets/pp.jpg"

export default function Home() {
    return(
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7A1CAC" }}>
            <div style={{ backgroundColor: '#2E073F' }} className="navbar font-[family-name:var(--font-now)]">
                <div className="navbar-start">
                    <HomeLogin/>
                </div>
                <div className="navbar-center flex">
                    <div className="text-xl hidden sm:flex">
                        <Link href="/upload" className="p-2"> Upload </Link>
                        <Link href="/gallery" className="p-2"> Galleries </Link>
                        <Link href="/sharing" className="p-2"> Shared </Link>
                        <Link href="/about" className="p-2"> About Us </Link>
                    </div>
                    <div className="dropdown sm:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="text-gray-200 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            style={{ backgroundColor: "#7A1CAC" }}
                            >
                            <li><Link href="/upload">Upload</Link></li>
                            <li><Link href="/gallery">Galleries</Link></li>
                            <li><Link href="/sharing">Shared</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                        >
                        <div className="w-10 rounded-full">
                            <Image
                            src={Pp}
                            alt="User Avatar"
                            />
                        </div>
                        </div>
                        <ul
                        tabIndex={0}
                        className="text-gray-200 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        style={{ backgroundColor: '#2E073F' }}
                        >
                            <li>
                                <Link href="/profile" className="justify-between">Profile</Link>
                            </li>
                            <li>
                                <Link href="/">  
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>         
            </div>
            <div className="flex flex-1">
                <div className="w-64 bg-[#2E073F] text-gray-200 p-4 hidden md:block">
                <h2 className="text-xl font-bold mb-4">Pending Request</h2>
                <div className="space-y-2">
                    <div className="p-3 bg-[#7A1CAC] rounded-lg">
                    <p className="font-semibold">File request from John</p>
                    <p className="text-sm">Document.pdf</p>
                    <div className="flex gap-2 mt-2">
                        <button className="bg-green-600 px-2 py-1 rounded text-sm">Accept</button>
                        <button className="bg-red-600 px-2 py-1 rounded text-sm">Decline</button>
                    </div>
                    </div>
                    <div className="p-3 bg-[#7A1CAC] rounded-lg">
                    <p className="font-semibold">File request from Sarah</p>
                    <p className="text-sm">Project.docx</p>
                    <div className="flex gap-2 mt-2">
                        <button className="bg-green-600 px-2 py-1 rounded text-sm">Accept</button>
                        <button className="bg-red-600 px-2 py-1 rounded text-sm">Decline</button>
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex-1 p-6">
                <h1 className="text-2xl font-bold text-gray-200 mb-6">Shared Files</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="bg-[#2E073F] p-4 rounded-lg text-gray-200">
                        <div className="w-full h-32 bg-[#7A1CAC] rounded-lg mb-2"></div>
                        <h3 className="font-semibold">Shared File {item}</h3>
                        <p className="text-sm text-gray-400">Shared by: User</p>
                        <p className="text-sm text-gray-400">Date: 2024-10-30</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}