import React from 'react';

import {Menu,Search,Video,Bell,User,LogOut, Plus,Mic} from 'lucide-react';
  
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ toggleSidebar }) => {

  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  return (

    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#020617]/90 backdrop-blur-md border-b border-white/5">

      {/* LEFT */}

      <div className="flex items-center gap-4">

        {/* MENU BUTTON */}

        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0b1220] border border-white/5 text-gray-400 hover:text-white hover:border-cyan-500/20 hover:bg-white/5 transition-all duration-300"
        >

          <Menu size={22} />

        </button>

        {/* LOGO */}

        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          <div className="relative">

            {/* GLOW */}

            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-30 group-hover:opacity-60 transition-all duration-300 rounded-xl"></div>

            {/* ICON */}

            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20">

              <Video
                className="text-white"
                size={20}
              />

            </div>

          </div>

          {/* TEXT */}

          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">

            VideoStream

          </span>

        </Link>

      </div>

      {/* CENTER SEARCH */}

      <div className="flex-1 max-w-2xl px-6">

        <div className="relative w-full group">

          {/* GLOW */}

          <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

          {/* SEARCH BOX */}

          <div className="relative flex items-center bg-[#0b1220]/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

            {/* SEARCH ICON */}

            <div className="pl-5">

              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border border-white/10">

                <Search
                  size={18}
                  className="text-cyan-400"
                />

              </div>

            </div>

            {/* INPUT */}

            <input
              type="text"
              placeholder="Search entertainment videos..."
              className="w-full bg-transparent px-4 py-4 text-sm text-white placeholder:text-gray-400 outline-none"
            />

            {/* MIC BUTTON */}

            <button className="mr-3 flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">

              <Mic
                size={18}
                className="text-pink-400"
              />

            </button>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        {user ? (
          <>

            {/* CREATE */}

            <Link
              to="/create"
              title="Add Video"
              className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0b1220] border border-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-white/5 transition-all duration-300"
            >

              <Plus size={22} />

            </Link>

            {/* BELL */}

            <button className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0b1220] border border-white/5 text-gray-400 hover:text-white hover:border-cyan-500/20 hover:bg-white/5 transition-all duration-300">

              <Bell size={20} />

              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>

            </button>

            {/* USER */}

            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0b1220] border border-white/5 shadow-xl">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center font-bold text-white">

                {user.username?.charAt(0).toUpperCase()}

              </div>

              <span className="text-sm font-bold text-white">

                @{user.username}

              </span>

              <button
                onClick={logout}
                className="text-gray-400 hover:text-rose-400 transition-colors"
                title="Logout"
              >

                <LogOut size={18} />

              </button>

            </div>

          </>
        ) : (

          /* SIGN IN BUTTON */

          <button
            onClick={() => navigate('/auth')}
            className="group relative overflow-hidden"
          >

            {/* GLOW */}

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500"></div>

            {/* BUTTON */}

            <div className="relative flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#0b1220]/95 backdrop-blur-xl border border-white/10 hover:border-cyan-500/20 transition-all duration-300 shadow-2xl">

              {/* ICON BOX */}

              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 border border-white/10">

                <User
                  size={18}
                  className="text-cyan-400"
                />

              </div>

              {/* TEXT */}

              <span className="text-sm font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">

                Sign In

              </span>

            </div>

          </button>

        )}

      </div>

    </nav>

  );

};

export default Navbar;