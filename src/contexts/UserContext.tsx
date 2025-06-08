import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

import type { MongoUser, UserContextType } from '../types'; // Đảm bảo MongoUser được định nghĩa ở đây
import AXIOS, { setAuthTokenGetter } from '../services/api.axios'; // Import AXIOS và setAuthTokenGetter

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user: clerkUser, isSignedIn, isLoaded: clerkUserLoaded } = useUser();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  // Hook để inject getToken vào Axios global instance
  // Đây là nơi quan trọng để lỗi 401 của bạn được giải quyết
  useEffect(() => {
    // Chỉ thiết lập khi Clerk Auth đã tải
    if (authLoaded) {
      // Đặt hàm getToken của Clerk làm nguồn lấy token cho Axios
      // template: 'backend-api-jwt' là tên template JWT bạn đã cấu hình trong Clerk Dashboard
      // để backend của bạn có thể xác minh.
      setAuthTokenGetter(() => getToken({ template: 'backend-api-jwt' }));
    }
    // Cleanup function để reset authTokenGetter khi component unmounts hoặc authLoaded thay đổi
    return () => {
      if (!authLoaded) {
        // Chỉ reset nếu Clerk Auth chưa tải đầy đủ hoặc đã logout
        setAuthTokenGetter(() => Promise.resolve(null)); // Đặt lại về null hoặc một hàm trả về null
      }
    };
  }, [authLoaded, getToken]); // Re-run khi authLoaded hoặc getToken thay đổi

  useEffect(() => {
    const fetchAndSyncUser = async () => {
      // Chờ cho cả Clerk User và Auth state được tải
      if (!clerkUserLoaded || !authLoaded) {
        setIsLoadingUser(true);
        return;
      }

      if (!isSignedIn || !clerkUser) {
        setMongoUser(null);
        setIsLoadingUser(false);
        return;
      }

      setIsLoadingUser(true);
      try {
        // AXIOS giờ đây đã được cấu hình để tự động lấy token thông qua setAuthTokenGetter
        // KHÔNG cần truyền header Authorization thủ công ở đây nữa
        const response = await AXIOS.get<{ user: MongoUser }>('/auth/me');
        setMongoUser(response.data.user);
      } catch (err) {
        console.error('Lỗi khi lấy hoặc đồng bộ người dùng từ /auth/me:', err);
        setMongoUser(null);
        // Có thể thêm logic để xóa token Clerk nếu lỗi là do token không hợp lệ/hết hạn
        // hoặc chuyển hướng về trang đăng nhập.
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchAndSyncUser();
  }, [isSignedIn, clerkUser, clerkUserLoaded, authLoaded]);

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
