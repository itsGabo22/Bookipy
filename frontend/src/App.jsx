import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Hotel } from 'lucide-react';
import HomeView from './views/HomeView';
import DashboardView from './views/DashboardView';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#1C2541',
          color: '#fff',
          border: '1px solid #3A506B'
        }
      }} />
      
      {/* Navbar */}
      <nav className="bg-brand-navy border-b border-brand-teal/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2 text-brand-gold hover:text-brand-accent transition-colors">
              <Hotel size={28} />
              <span className="text-xl font-bold tracking-tight">Bookipy</span>
            </Link>
            <div className="flex gap-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Book a Room
              </Link>
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                My Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/dashboard" element={<DashboardView />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy border-t border-brand-teal/30 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Bookipy Hotel Reservation System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
