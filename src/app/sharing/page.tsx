"use client"

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import useStore, { getAuthenticatedUser } from '@/utils/api';
import HomeLogin from "@/components/buttons/HomeLogin";
import Pp from "@/public/assets/pp.jpg";
import DownloadDialog from "@/components/DownloadDialog";

interface PendingRequest {
    id: number;
    requestedAt: string;
    expiresAt: string;
    file: {
        id: number;
        filename: string;
        mimetype: string;
    };
    requester: {
        username: string;
        email: string;
    };
}

interface UserFile {
    id: number;
    filename: string;
    mimetype: string;
}

interface SharedFile {
    id: number;
    filename: string;
    mimetype: string;
    owner: string;
    sharedAt: string;
    expiresAt: string;
}
interface ShareKeyDialogProps {
    isOpen: boolean;
    onClose: () => void;
    encryptedKey: string;
  }
  
  const ShareKeyDialog = ({ isOpen, onClose, encryptedKey }: ShareKeyDialogProps) => {
    const [copySuccess, setCopySuccess] = useState(false);
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(encryptedKey);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#2E073F] p-6 rounded-lg max-w-2xl w-full mx-4">
          <h3 className="text-xl font-bold text-gray-200 mb-4">Share Request Accepted</h3>
          <p className="text-gray-200 mb-2">Please save this encryption key - you'll need it to download the file:</p>
          <div className="relative">
            <textarea
              readOnly
              value={encryptedKey}
              className="w-full h-24 p-2 bg-[#7A1CAC] text-gray-200 rounded mb-4 font-mono text-sm"
            />
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-gray-200 text-sm mb-4">
            <p>⚠️ Make sure to:</p>
            <ul className="list-disc pl-5">
              <li>Copy and save this key immediately</li>
              <li>You'll need it to download the shared file</li>
              <li>This key won't be shown again</li>
            </ul>
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#7A1CAC] text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

export default function Home() {
    const { 
        requestFileShare,
        getPendingRequests,
        acceptShareRequest,
        getSharedFilesList,
        getSharedFile,
        getUserFiles,
    } = useStore();

    const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
    const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
    const [userFiles, setUserFiles] = useState<Set<number>>(new Set());
    const [isAccepting, setIsAccepting] = useState<Record<string, boolean>>({});
    const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
    const [selectedFileForDownload, setSelectedFileForDownload] = useState<string | null>(null);
    const [showEncryptionKey, setShowEncryptionKey] = useState(false);
    const [currentEncryptionKey, setCurrentEncryptionKey] = useState('');

    useEffect(() => {
        fetchCurrentUser().then(() => fetchData());
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const userData = await getAuthenticatedUser();
            setCurrentUserEmail(userData.email);
            return userData.email;
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    };

    const fetchUserFiles = async () => {
        try {
            const response = await getUserFiles();
            const files: UserFile[] = response.data || [];
            const fileIds = new Set(files.map(file => file.id));
            setUserFiles(fileIds);
            return fileIds;
        } catch (error) {
            console.error("Error fetching user files:", error);
            return new Set<number>();
        }
    };

    const fetchData = async () => {
        try {
            const fileIds = await fetchUserFiles();
            
            const pendingResponse = await getPendingRequests();
            if (pendingResponse?.data) {
                const userRequests = pendingResponse.data.filter(
                    (request: PendingRequest) => fileIds.has(request.file.id)
                );
                console.log(pendingResponse);
                setPendingRequests(userRequests);
            }
    
            const sharedResponse = await getSharedFilesList();
            const filesArray = Array.isArray(sharedResponse) ? sharedResponse : 
                             sharedResponse?.data ? sharedResponse.data : [];
            console.log(sharedResponse);
            setSharedFiles(filesArray);
        } catch (error) {
            console.error("Error fetching data:", error);
            setPendingRequests([]);
            setSharedFiles([]);
        }
    };

    const handleAcceptRequest = async (fileId: string) => {
        try {
            setIsAccepting(prev => ({ ...prev, [fileId]: true }));
            const response = await acceptShareRequest(fileId);
            console.log('Accept response:', response);

            if (response.encryptedKey) {
                setCurrentEncryptionKey(response.encryptedKey);
                setShowEncryptionKey(true);
            } else {
                alert('Share request accepted, but no encrypted key was received.');
            }
            
            await fetchData();
        } catch (error) {
            console.error('Error accepting share request:', error);
            if (error instanceof Error) {
                alert(`Failed to accept share request: ${error.message}`);
            } else {
                alert('Failed to accept share request. Please try again.');
            }
        } finally {
            setIsAccepting(prev => ({ ...prev, [fileId]: false }));
        }
    };

    const handleRequestFile = async (fileId: string) => {
        try {
            const request = await requestFileShare(fileId);
            alert('File access requested successfully');
            setSelectedFileId(null);
            fetchData();
            console.log(request);
        } catch (error) {
            console.error('Error requesting file access:', error);
            alert('Failed to request file access');
        }
    };

    const handleDownloadSharedFile = async (fileId: string, password: string, encryptedKey: string) => {
        try {
          // Input validation
          if (!password) {
            alert('Password is required');
            return;
          }
          if (!encryptedKey) {
            alert('Encryption key is required');
            return;
          }
      
          // Enhanced key formatting
          let formattedKey = encryptedKey
            .trim()
            .replace(/\s+/g, '+')     // Replace any whitespace with +
            .replace(/-/g, '+')       // Replace any - with +
            .replace(/_/g, '/');      // Replace any _ with /
      
          // Add proper base64 padding if missing
          while (formattedKey.length % 4) {
            formattedKey += '=';
          }
      
          console.log('Attempting download with formatted key:', {
            fileId,
            keyLength: formattedKey.length,
            // Log first and last 4 chars of key for debugging (avoid logging sensitive data)
            keyPreview: `${formattedKey.slice(0,4)}...${formattedKey.slice(-4)}`
          });
      
          const response = await getSharedFile(fileId, password, formattedKey);
          
          if (response.error) {
            console.error('Download failed:', response.error);
            alert(`Download failed: ${response.error}`);
            return;
          }
      
          if (!response.data) {
            alert('No file data received');
            return;
          }
      
          // Create a Blob URL and trigger download
          const blob = new Blob([response.data], { 
            type: response.data.type || 'application/octet-stream' 
          });
          const url = window.URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.download = response.fileName || `shared-file-${fileId}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Cleanup
          window.URL.revokeObjectURL(url);
          setIsDownloadDialogOpen(false);
          setSelectedFileForDownload(null);
      
        } catch (error) {
          console.error('Download error:', error);
          alert('Failed to download file. Please verify:\n1. The encryption key is complete and correct\n2. Your password is correct\n3. The file still exists and hasn\'t expired');
        }
      };

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
            <div className="flex flex-1 flex-wrap">
                <div className="mb-6 m-4 w-full md:w-auto">
                    <div className="bg-[#2E073F] p-4 rounded-lg">
                        <h2 className="text-xl font-bold text-gray-200 mb-4">Request File Access</h2>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter File ID"
                                value={selectedFileId || ''}
                                onChange={(e) => setSelectedFileId(e.target.value)}
                                className="bg-[#7A1CAC] text-gray-200 rounded-lg px-4 py-2 flex-1"
                            />
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-gray-200 px-4 py-2 rounded-lg"
                                onClick={() => selectedFileId && handleRequestFile(selectedFileId)}
                                disabled={!selectedFileId}
                            >
                                Request Access
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-auto max-w-md p-8 m-2 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                    <h2 className="text-gray-200 text-xl mb-4">Pending Requests</h2>
                    {pendingRequests.length === 0 ? (
                        <p className="text-gray-200">No pending requests.</p>
                    ) : (
                        pendingRequests.map((request) => (
                            <div key={request.id} className="card card-compact bg-base-100 w-96 shadow-xl mb-4">
                                <div className="card-body">
                                    <h3>Request from: {request.requester.username}</h3>
                                    <p>File: {request.file.filename}</p>
                                    <div className="card-actions">
                                        <button
                                            style={{ backgroundColor: "#7A1CAC" }}
                                            className="btn text-white"
                                            onClick={() => handleAcceptRequest(request.id.toString())}
                                            disabled={isAccepting[request.id]}
                                            >
                                            {isAccepting[request.id] ? 'Accepting...' : 'Accept'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="w-full md:w-auto max-w-md p-8 m-2 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                    <h2 className="text-gray-200 text-xl mb-4">Shared Files</h2>
                    {sharedFiles.length === 0 ? (
                        <p className="text-gray-200">No shared files.</p>
                    ) : (
                        sharedFiles.map((file) => (
                            <div key={file.id} className="card card-compact bg-base-100 w-96 shadow-xl mb-4">
                                <div className="card-body">
                                    <h3>{file.filename}</h3>
                                    <p>Shared by: {file.owner}</p>
                                    <p>Expires: {file.expiresAt}</p>
                                    <div className="card-actions">
                                        <button
                                            style={{ backgroundColor: "#7A1CAC" }}
                                            className="btn text-white"
                                            onClick={() => {
                                                setSelectedFileForDownload(file.id.toString());
                                                setIsDownloadDialogOpen(true);
                                            }}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <DownloadDialog
                    isOpen={isDownloadDialogOpen}
                    onClose={() => {
                        setIsDownloadDialogOpen(false);
                        setSelectedFileForDownload(null);
                    }}
                    onDownload={async (password, encryptedKey) => {
                        if (selectedFileForDownload) {
                            await handleDownloadSharedFile(selectedFileForDownload, password, encryptedKey);
                        }
                    }}
                />
                <ShareKeyDialog
                    isOpen={showEncryptionKey}
                    onClose={() => setShowEncryptionKey(false)}
                    encryptedKey={currentEncryptionKey}
                />
            </div>
        </div>
    )
}