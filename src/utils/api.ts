  import axios, { AxiosError } from "axios";
  import { create, StateCreator } from 'zustand';
  import { persist, PersistOptions } from 'zustand/middleware';

  interface SharedFileResponse {
    data?: Blob;
    message?: string;
    error?: string;
    fileName?: string;
  }

  interface ShareResponse {
    encryptedKey?: string;
    message?: string;
    status?: string;
  }

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
    getFileById: (fileId: string) => Promise<any>; 
    deleteFileById: (fileId: string) => Promise<any>;
  }

  interface ShareState {
    requestFileShare: (fileId: string) => Promise<any>;
    getSharedFilesList: () => Promise<any>;
    getSharedFile: (fileId: string, password: string, encryptedKey: string) => Promise<SharedFileResponse>;
    
    getPendingRequests: () => Promise<any>;
    acceptShareRequest: (fileId: string) => Promise<ShareResponse>;
    rejectShareRequest: (fileId: string) => Promise<any>;
  }



  type MyPersist = (
    config: StateCreator<UserState & FileState & ShareState>,
    options: PersistOptions<UserState & FileState & ShareState>
  ) => StateCreator<UserState & FileState & ShareState>;

  const useStore = create<UserState & FileState & ShareState>(
    (persist as MyPersist)(
      (set, get) => ({
        accessToken: null,
        username: null,
        email: null,
        setAccessToken: (token: string) => set({ accessToken: token }),
        setUsername: (username: string) => set({ username }),
        setEmail: (email: string) => set({ email }), 
        clearUser: () => set({ accessToken: null, username: null, email: null }),

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
        getFileById: async (fileId: string) => {
          const main = getAxiosInstance(get().accessToken);
          const response = await main.get(`/files/${fileId}`, {
            responseType: 'blob'
          });
          return response.data;
        },
        deleteFileById: async (fileId: string) => {
          const main = getAxiosInstance(get().accessToken); 
          const response = await main.delete(`/files/${fileId}`);
          return response.data;
        },
        requestFileShare: async (fileId: string) => {
          const main = getAxiosInstance(get().accessToken);
          const response = await main.post(`/share/request/${fileId}`);
          return response.data;
        },
        getSharedFilesList: async () => {
          const main = getAxiosInstance(get().accessToken);
          const response = await main.get('/share/files');
          return response.data;
        },
        getSharedFile: async (fileId: string, password: string, encryptedKey: string): Promise<SharedFileResponse> => {
          const main = getAxiosInstance(get().accessToken);

          const cleanEncryptedKey = encryptedKey.trim();

          let formattedKey = cleanEncryptedKey;
          if (formattedKey.includes(' ')) {
            formattedKey = formattedKey.replace(/\s/g, '+');
          }
          
          console.log('Attempting to download file with formatted data:', { 
            fileId,
            encryptedKeyLength: formattedKey.length,
            passwordLength: password.length
          });
        
          try {
            const response = await main.post(
              `/share/files/${fileId}`, 
              {
                password: password,
                encryptedKey: formattedKey
              },
              {
                responseType: 'blob',
                headers: {
                  'Accept': '*/*',
                  'Content-Type': 'application/json'
                }
              }
            );
        
            if (response.data instanceof Blob && response.data.type.includes('json')) {
              const text = await response.data.text();
              try {
                const errorData = JSON.parse(text);
                return {
                  error: errorData.message || 'Failed to download file',
                  message: 'Error downloading file'
                };
              } catch (e) {
                console.error('Error parsing JSON error response:', e);
              }
            }
        
            const contentDisposition = response.headers['content-disposition'];
            let fileName = '';
            if (contentDisposition) {
              const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
              if (matches != null && matches[1]) {
                fileName = matches[1].replace(/['"]/g, '');
              }
            }
        
            return {
              data: response.data,
              fileName: fileName || `shared-file-${fileId}`,
              message: 'File downloaded successfully'
            };
        
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response?.data instanceof Blob) {
                try {
                  const text = await error.response.data.text();
                  const errorData = JSON.parse(text);
                  console.error('Server error details:', errorData);
                  return {
                    error: errorData.message || 'Failed to decrypt file',
                    message: 'Error downloading file'
                  };
                } catch (e) {
                  console.error('Error parsing error blob:', e);
                }
              }
              
              return {
                error: 'Failed to download or decrypt file. Please check your password and encryption key.',
                message: 'Error downloading file'
              };
            }
            
            return {
              error: 'An unexpected error occurred while downloading the file',
              message: 'Error downloading file'
            };
          }
        },
        getPendingRequests: async () => {
          const main = getAxiosInstance(get().accessToken);
          const response = await main.get('/share/pending');
          return response.data;
        },
        acceptShareRequest: async (fileId: string) => {
          const main = getAxiosInstance(get().accessToken);
          try {
            const response = await main.post(`/share/accept/${fileId}`);
            const result: ShareResponse = {
              encryptedKey: response.data?.encryptedKey || response.data?.data?.encryptedKey,
              message: response.data?.message || response.data?.data?.message,
              status: response.data?.status || response.data?.data?.status
            };
            return result;
          } catch (error) {
            console.error('Error in acceptShareRequest:', error);
            throw error; 
          }
        },        rejectShareRequest: async (fileId: string) => {
          const main = getAxiosInstance(get().accessToken);
          try {
            const response = await main.post(`/share/reject/${fileId}`);
            return response.data;
          } catch (error) {
            console.error('Error in rejectShareRequest:', error);
            throw error;
          }
        },
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
    try {
      const response = await main.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          throw new Error('Account has been deleted');
        }
      }
      throw error;
    }
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
