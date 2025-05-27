import type { ReactNode } from 'react';
import Header from '../../../components/user/Header';
import Footer from '../../../components/user/Footer';

interface LayoutUserProps {
  children: ReactNode;
}

function LayoutUser({ children }: LayoutUserProps) {
  // your layout logic
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LayoutUser;
