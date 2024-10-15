import axios from "axios";
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface UserState {
  accessToken: string | null;
  username: string | null;
  email: string | null;
  setAccessToken: (token: string) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void; 
  clearUser: () => void;
}

interface FileState {
  uploadFile: (fileData: FormData) => Promise<any>;
  getUserFiles: () => Promise<any>;
  getFileByFilename: (filename: string) => Promise<any>; 
  deleteFileById: (fileId: string) => Promise<any>;
}

type MyPersist = (
  config: StateCreator<UserState & FileState>,
  options: PersistOptions<UserState & FileState>
) => StateCreator<UserState & FileState>;

const useStore = create<UserState & FileState>(
  (persist as MyPersist)(
    (set, get) => ({
      accessToken: null,
      username: null,
      email: null,
      setAccessToken: (token: string) => set({ accessToken: token }),
      setUsername: (username: string) => set({ username }),
      setEmail: (email: string) => set({ email }), 
      clearUser: () => set({ accessToken: null, username: null }),

      uploadFile: async (fileData: FormData) => {
        const main = getAxiosInstance(get().accessToken); 
        const response = await main.post("/files/upload", fileData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      },
      getUserFiles: async () => {
        const main = getAxiosInstance(get().accessToken); 
        const response = await main.get("/files/me");
        return response.data;
      },
      getFileByFilename: async (filename: string) => { 
        const main = getAxiosInstance(get().accessToken); 
        const response = await main.get(`/files/${filename}`);  
        return response.data;
      },
      deleteFileById: async (fileId: string) => {
        const main = getAxiosInstance(get().accessToken); 
        const response = await main.delete(`/files/${fileId}`);
        return response.data;
      }
    }),
    {
      name: 'user-storage',
    }
  )
);

const getAxiosInstance = (token: string | null) => {
  const main = axios.create({
    baseURL: "https://securevault-backend-plum.vercel.app/api",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  if (token) {
    main.interceptors.request.use((config) => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  return main;
};

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  const main = getAxiosInstance(null);
  const response = await main.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const main = getAxiosInstance(null);
  const response = await main.post("/auth/login", credentials);
  return response.data;
};

export const getAuthenticatedUser = async () => {
  const { accessToken } = useStore.getState();
  if (!accessToken) {
    throw new Error("No access token available.");
  }
  const main = getAxiosInstance(accessToken);
  const response = await main.get("/auth/me");
  return response.data;
};

export const updateUser = async (userData: { username?: string; email?: string; password?: string }) => {
  const { accessToken } = useStore.getState();
  const main = getAxiosInstance(accessToken);
  const response = await main.put("/users/update", userData);
  return response.data;
};

export const deleteUser = async () => {
  const { accessToken } = useStore.getState();
  const main = getAxiosInstance(accessToken);
  const response = await main.delete("/users/delete");
  return response.data;
};

export default useStore;
