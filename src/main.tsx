import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
// Import Provider và store
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container!);
const PUBLISHABLE_KEY =
  'pk_test_Y29udGVudC1tYWdwaWUtMjEuY2xlcmsuYWNjb3VudHMuZGV2JA';
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <App />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);
