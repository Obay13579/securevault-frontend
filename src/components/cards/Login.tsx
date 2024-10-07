import React from 'react'
import Logo from "@/public/assets/securevault.png"
import Image from 'next/image'
import Link from 'next/link'

export const Login = () => {
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
                alt="Logo" />
            </figure>
            <div className="card-body items-center text-center">
                <label className="form-control w-full max-w-xs">
                    <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs mt-3">
                    <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                    <div className="label">
                        <Link href="/auth/register" className="link link-hover">
                            <span className="text-gray-300 label-text-alt text-sm">Didn&apos;t have an account ?</span>
                        </Link>
                    </div>
                </label>
                <div className="card-actions">
                    <button className="btn btn-neutral">Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;