// Định nghĩa kiểu cho người dùng từ MongoDB của bạn
export interface MongoUser {
  _id: string;
  clerkUserId: string;
  name: string;
  email: string;
  role: 'user' | 'admin'; // Chỉ định rõ các vai trò có thể có
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

// Định nghĩa kiểu cho Context của người dùng
export interface UserContextType {
  mongoUser: MongoUser | null;
  isLoadingUser: boolean;
  isSignedIn: boolean;
}
