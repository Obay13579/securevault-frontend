"use client"

import Link from "next/link";
import Image from "next/image";
import HomeLogin from "@/components/buttons/HomeLogin";
import Pp from "@/public/assets/pp.jpg";
import React, { useEffect, useState } from "react";
import useStore from "@/utils/api"; 

interface File {
  id: string;
  name: string;
  url?: string;
}

export default function Home() {
  const [files, setFiles] = useState<File[]>([]); 
  const getUserFiles = useStore((state) => state.getUserFiles); 
  const getFileByFilename = useStore((state) => state.getFileByFilename); 
  const deleteFileById = useStore((state) => state.deleteFileById); 

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await getUserFiles(); 
      console.log("Files from API:", response);
  
      if (response && response.data && Array.isArray(response.data.data)) {
        console.log("Fetched files successfully:", response.data.data);
        setFiles(response.data.data); 
      } else {
        console.error("Unexpected response structure:", response);
        setFiles([]); 
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]); 
    }
  };
  

  const handleDownload = async (fileId: string, filename: string) => {
    try {
      const fileBlob = await getFileByFilename(filename);
      
      const url = window.URL.createObjectURL(fileBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading file ${filename}:`, error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7A1CAC" }}>
      <div style={{ backgroundColor: '#2E073F' }} className="navbar font-[family-name:var(--font-now)]">
        <div className="navbar-start">
          <HomeLogin/>
        </div>
        <div className="navbar-center flex">
          <div className="text-xl hidden sm:flex">
            <Link href="/upload" className="p-2"> Upload </Link>
            <Link href="/gallery" className="p-2"> Galleries </Link>
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
      <div className="flex-grow flex flex-col items-center justify-start">
        <div className="font-[family-name:var(--font-now)] text-gray-200 text-6xl mt-20">
          Your Files ~
        </div>
        <div className="w-full max-w-md p-8 m-2 mt-20 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
          {files.length === 0 ? (
            <p className="text-gray-200">No files uploaded yet.</p>
          ) : (
            files.map((file) => (
              <div key={file.id} className="card card-compact bg-base-100 w-96 shadow-xl mb-4">
                <div className="card-body">
                  <h3>{file.name}</h3>
                  <div className="card-actions">
                    <div className="justify-start">
                      <button
                        style={{ backgroundColor: "#7A1CAC" }}
                        className="btn text-white"
                        onClick={() => handleDownload(file.id, file.name)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
