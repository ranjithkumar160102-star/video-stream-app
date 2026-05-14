import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
import Playlists from './pages/Playlists';
import Watchlist from './pages/Watchlist';
import Auth from './pages/Auth';
import CreateVideo from './pages/CreateVideo';

function App() {const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          
          <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-20'}`}>
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/create" element={<CreateVideo />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/watchlist" element={<Watchlist />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;