// src/components/SyncClerkUser.tsx
import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import AXIOS from '../services/api.axios';

const SyncClerkUser = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        // Token sẽ được tự động thêm bởi interceptor
        const response = await AXIOS.post('/me', {
          clerkUserId: user.id,
          name: `${user.firstName} ${user.lastName ?? ''}`.trim(),
          email: user.primaryEmailAddress?.emailAddress,
          emailVerified:
            user.primaryEmailAddress?.verification?.status === 'verified',
          role: user.publicMetadata?.role || 'user',
        });

        console.log('Đồng bộ thành công:', response.data);
      } catch (err) {
        console.error('Lỗi đồng bộ:', err);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
};

export default SyncClerkUser;
