'use client'; // This tells Next.js that this is a Client Component

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface FileObject {
  filename: string;
  originalname: string;
  // Add other properties that your file object might have
}

const FileCard: React.FC<{ file: FileObject; onDelete: (filename: string) => void }> = ({ file, onDelete }) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl m-4">
      <figure>
        <img
          src={`https://securevault-backend-plum.vercel.app/api/files/${file.filename}`}
          alt={file.originalname}
        />
      </figure>
      <div className="card-body">
        <p>{file.originalname}</p>
        <div className="card-actions justify-between">
          <a
            href={`https://securevault-backend-plum.vercel.app/api/files/${file.filename}`}
            download
            className="btn btn-primary"
          >
            Download
          </a>
          <button onClick={() => onDelete(file.filename)} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Files: React.FC = () => {
  const [files, setFiles] = useState<FileObject[]>([]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get<FileObject[]>('https://securevault-backend-plum.vercel.app/api/files/me');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      await axios.delete(`https://securevault-backend-plum.vercel.app/api/files/${filename}`);
      fetchFiles(); // Refresh the file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {files.map((file) => (
        <FileCard key={file.filename} file={file} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Files;
