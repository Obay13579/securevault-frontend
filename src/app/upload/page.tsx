'use client';

import React, { useState, useEffect } from 'react';
import NavbarLogin from "@/components/navbar/NavbarLogin";
import Link from 'next/link';

interface UserFile {
    id: string;
    filename: string;
    url: string;
}

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [userFiles, setUserFiles] = useState<UserFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authCheckComplete, setAuthCheckComplete] = useState(false);

    useEffect(() => {
        console.log("Home component mounted"); // Debugging line
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        console.log("Checking authentication..."); // Debugging line
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token); // Debugging line

        if (!token) {
            console.log("No token found, user is not authenticated"); // Debugging line
            setIsAuthenticated(false);
            setAuthCheckComplete(true);
            return;
        }

        try {
            console.log("Verifying token with backend..."); // Debugging line
            const response = await fetch('https://securevault-backend-plum.vercel.app/api/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("Backend response status:", response.status); // Debugging line

            if (response.ok) {
                console.log("Token verified successfully, user is authenticated"); // Debugging line
                setIsAuthenticated(true);
            } else {
                console.log("Token verification failed, user is not authenticated"); // Debugging line
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error verifying authentication:', error);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        } finally {
            setAuthCheckComplete(true);
            console.log("Authentication check complete"); // Debugging line
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        if (!isAuthenticated) {
            setUploadError('You must be logged in to upload files.');
            return;
        }

        setUploading(true);
        setUploadError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://securevault-backend-plum.vercel.app/api/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setUserFiles(prevFiles => [...prevFiles, data]);
                setFile(null);
                // Reset the file input
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                const errorData = await response.json();
                setUploadError(errorData.message || 'Failed to upload file');
            }
        } catch (error) {
            setUploadError('An error occurred while uploading the file');
        } finally {
            setUploading(false);
        }
    };

    if (!authCheckComplete) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#7A1CAC" }}>
                <h1 className="text-4xl text-white mb-8">Please log in to upload files</h1>
                <Link href="/login" passHref>
                    <button className="btn btn-primary">
                        Go to Login
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7A1CAC" }}>
            <NavbarLogin />
            <div className="flex-grow flex flex-col items-center justify-start">
                <div className="font-[family-name:var(--font-now)] text-gray-200 text-6xl mt-20">
                    Upload Files!
                </div>
                <div className="w-full max-w-md p-8 m-2 mt-20 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="text-gray-200 label-text text-lg font-semibold">Pick a file</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileChange} />
                        <div className="label">
                            <span className="text-gray-200 label-text-alt text-sm">.jpg .jpeg .png .pdf .mp4 .mov</span>
                        </div>
                    </label>
                    {uploadError && <p className="text-error mt-2">{uploadError}</p>}
                    <button 
                        className="btn btn-primary w-full mt-4" 
                        onClick={handleUpload} 
                        disabled={!file || uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
                <div className="w-full max-w-md p-8 m-2 mt-10 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                    <h2 className="text-gray-200 text-2xl font-semibold mb-4">Your Files</h2>
                    {userFiles.length > 0 ? (
                        <ul className="space-y-2">
                            {userFiles.map((file) => (
                                <li key={file.id} className="text-gray-200">
                                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {file.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-200">No files uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}