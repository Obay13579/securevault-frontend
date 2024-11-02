import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: (password: string, encryptedKey: string) => void;
}

export default function DownloadDialog({ isOpen, onClose, onDownload }: DownloadDialogProps) {
  const [password, setPassword] = useState('');
  const [encryptedKey, setEncryptedKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (!encryptedKey.trim()) {
      setError('Encrypted key is required');
      return;
    }

    onDownload(password.trim(), encryptedKey.trim());
    setPassword('');
    setEncryptedKey('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2E073F] text-gray-200">
        <DialogHeader>
          <DialogTitle>Download Shared File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-[#7A1CAC] rounded-lg text-gray-200"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label htmlFor="encryptedKey" className="block text-sm font-medium mb-1">
              Encrypted Key
            </label>
            <input
              id="encryptedKey"
              type="text"
              value={encryptedKey}
              onChange={(e) => setEncryptedKey(e.target.value)}
              className="w-full p-2 bg-[#7A1CAC] rounded-lg text-gray-200"
              placeholder="Enter encrypted key"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7A1CAC] rounded-lg hover:bg-[#6A1A9C]"
            >
              Download
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}