import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

import type { MongoUser, UserContextType } from '../types';
import AXIOS from '../services/api.axios'; // Đảm bảo đường dẫn này đúng

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: clerkUser, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  useEffect(() => {
    const fetchAndSyncUser = async () => {
      // Xử lý trường hợp isSignedIn có thể là undefined trong quá trình khởi tạo của Clerk
      if (isSignedIn === undefined) {
        setIsLoadingUser(true); // Vẫn đang chờ Clerk khởi tạo
        return;
      }

      if (!isSignedIn || !clerkUser) {
        setMongoUser(null);
        setIsLoadingUser(false); // Khi này isSignedIn chắc chắn là false
        return;
      }

      setIsLoadingUser(true);
      try {
        const token = await getToken();
        const response = await AXIOS.get<{ user: MongoUser }>('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMongoUser(response.data.user);
      } catch (err) {
        console.error('Lỗi khi lấy hoặc đồng bộ người dùng:', err);
        setMongoUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchAndSyncUser();
  }, [isSignedIn, clerkUser, getToken]);

  return (
    <UserContext.Provider
      value={{ mongoUser, isLoadingUser, isSignedIn: isSignedIn || false }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useMongoUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useMongoUser phải được sử dụng trong UserProvider');
  }
  return context;
};
