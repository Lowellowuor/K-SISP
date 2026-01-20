import React from 'react';
import Header from './Header';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Simple dot pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <Header />
      
      <main className="pt-32 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Floating elements */}
      <div className="fixed top-1/4 left-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
    </div>
  );
}

export default MainLayout;