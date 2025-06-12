import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
// Import Provider và store
import { UserProvider } from './contexts/UserContext';

const container = document.getElementById('root');
const root = createRoot(container!);
const PUBLISHABLE_KEY =
  'pk_test_Y29udGVudC1tYWdwaWUtMjEuY2xlcmsuYWNjb3VudHMuZGV2JA';

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserProvider>
        <App />
      </UserProvider>
    </ClerkProvider>
  </React.StrictMode>
);
