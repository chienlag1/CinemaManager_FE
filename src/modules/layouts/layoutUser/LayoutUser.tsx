import Header from '../../auth/components/Header';
import Footer from '../../auth/components/Footer';
import type { ReactNode } from 'react';

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
