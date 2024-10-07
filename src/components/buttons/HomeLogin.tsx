import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/assets/securevault.png";

const HomeLogin = () => {
  return (
    <Link href="/dashboard" style={{ backgroundColor: '#2E073F' }} className="flex items-center">
        <div className="w-10 m-1">
            <Image
                src={logo} 
                alt="logo"
            />
        </div>
        <p className="text-gray-200 text-xl font-semibold font-[family-name:var(--font-now)] m-1">SECURE VAULT</p>
    </Link>
  )
}

export default HomeLogin;