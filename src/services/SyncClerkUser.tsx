import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import AXIOS from './api.axios';

const SyncClerkUser = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        const token = await getToken();
        await AXIOS.post(
          '/me',
          {
            clerkUserId: user.id,
            name: `${user.firstName} ${user.lastName ?? ''}`,
            email: user.primaryEmailAddress?.emailAddress,
            emailVerified:
              user.primaryEmailAddress?.verification?.status === 'verified',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error('Lỗi khi đồng bộ người dùng Clerk:', err);
      }
    };

    syncUser();
  }, [isSignedIn, user, getToken]);

  return null;
};

export default SyncClerkUser;
