'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/public/assets/securevault.png'

interface FormData {
  email: string;
  password: string;
}

interface UserData {
  id: string;
  username: string;
  email: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://securevault-backend-plum.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        // Assuming the API returns a token
        localStorage.setItem('token', data.token)
        
        // Fetch user data
        await fetchUserData()
        
        // Redirect to dashboard or home page
        router.push('/dashboard')
      } else {
        const data = await response.json()
        setError(data.message || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://securevault-backend-plum.vercel.app/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        const userData: UserData = await response.json()
        // Store user data in local storage or state management solution
        localStorage.setItem('userData', JSON.stringify(userData))
      } else {
        console.error('Failed to fetch user data')
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200" style={{ backgroundColor: '#2E073F' }}>
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
            width={100}
            height={100}
          />
        </figure>
        <form onSubmit={handleSubmit} className="card-body items-center text-center">
          <label className="form-control w-full max-w-xs">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </label>
          <label className="form-control w-full max-w-xs mt-3">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
            <div className="label">
              <Link href="/auth/register" className="link link-hover">
                <span className="text-gray-300 label-text-alt text-sm">Don&apos;t have an account?</span>
              </Link>
            </div>
          </label>
          {error && <p className="text-error text-sm">{error}</p>}
          <div className="card-actions">
            <button type="submit" className="btn btn-neutral">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

