import React from 'react';

import { NavLink } from 'react-router-dom';

import {Home, Compass,Clock3,ThumbsUp, History,Layers3,Radio,Settings, HelpCircle} from 'lucide-react';

import { cn } from '../utils/cn';

const SidebarItem = ({
  icon: Icon,
  label,
  to,
  isOpen
}) => {

  return (

    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",

          isActive
            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        )
      }
    >

      {/* ICON BOX */}

      <div
        className={cn(
          "flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300",

          "bg-[#111827] border-white/5",

          "group-hover:scale-105",

          label === "Explore" &&
            "group-hover:border-cyan-500/20",

          label === "Live" &&
            "group-hover:border-pink-500/20",

          label === "Playlists" &&
            "group-hover:border-purple-500/20",

          label === "Watch List" &&
            "group-hover:border-yellow-500/20",

          label === "History" &&
            "group-hover:border-green-500/20",

          label === "Liked Videos" &&
            "group-hover:border-rose-500/20",

          label === "Settings" &&
            "group-hover:border-cyan-500/20",

          label === "Help" &&
            "group-hover:border-orange-500/20"
        )}
      >

        <Icon
          size={20}
          className={cn(
            "transition-all duration-300",

            label === "Home" &&
              "group-hover:text-cyan-400",

            label === "Explore" &&
              "group-hover:text-cyan-400",

            label === "Live" &&
              "group-hover:text-pink-400",

            label === "Playlists" &&
              "group-hover:text-purple-400",

            label === "Watch List" &&
              "group-hover:text-yellow-400",

            label === "History" &&
              "group-hover:text-green-400",

            label === "Liked Videos" &&
              "group-hover:text-rose-400",

            label === "Settings" &&
              "group-hover:text-cyan-400",

            label === "Help" &&
              "group-hover:text-orange-400",

            "group-hover:scale-110"
          )}
        />

      </div>

      {/* LABEL */}

      {isOpen && (

        <span className="text-sm font-semibold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300">

          {label}

        </span>

      )}

      {/* TOOLTIP */}

      {!isOpen && (

        <div className="absolute left-full ml-5 px-3 py-2 bg-[#111827] border border-white/10 text-white text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-2xl">

          {label}

        </div>

      )}

    </NavLink>

  );

};

const Sidebar = ({ isOpen }) => {

  return (

    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-[#020817] border-r border-white/5 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out scrollbar-hide",

        isOpen
          ? "w-64"
          : "w-24"
      )}
    >

      {/* GLOW */}

      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl rounded-full"></div>

      <div className="relative z-10 flex flex-col gap-2 p-4">

        {/* MENU */}

        <SidebarItem
          icon={Home}
          label="Home"
          to="/"
          isOpen={isOpen}
        />

        <SidebarItem
          icon={Compass}
          label="Explore"
          to="/explore"
          isOpen={isOpen}
        />

        <SidebarItem
          icon={Radio}
          label="Live"
          to="/live"
          isOpen={isOpen}
        />

        <div className="my-4 h-px bg-white/5 mx-2" />

        <SidebarItem
          icon={Layers3}
          label="Playlists"
          to="/playlists"
          isOpen={isOpen}
        />

        <SidebarItem
          icon={Clock3}
          label="Watch List"
          to="/watchlist"
          isOpen={isOpen}
        />

        <SidebarItem
          icon={History}
          label="History"
          to="/history"
          isOpen={isOpen}
        />

        <SidebarItem
          icon={ThumbsUp}
          label="Liked Videos"
          to="/liked"
          isOpen={isOpen}
        />

        <div className="my-4 h-px bg-white/5 mx-2" />

        <SidebarItem
          icon={Settings}
          label="Settings"
          to="/settings"
          isOpen={isOpen}
        />

        <SidebarItem
          icon={HelpCircle}
          label="Help"
          to="/help"
          isOpen={isOpen}
        />

      </div>

      {/* SUBSCRIPTIONS */}

      {isOpen && (

        <div className="relative z-10 mt-8 px-6 pb-10">

          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[2px] mb-5">

            Subscriptions

          </h3>

          <div className="flex flex-col gap-4">

            {[1, 2, 3].map((i) => (

              <div
                key={i}
                className="flex items-center gap-3 group cursor-pointer"
              >

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20"></div>

                <span className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors">

                  Creator {i}

                </span>

                <div className="ml-auto w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>

              </div>

            ))}

          </div>

        </div>

      )}

    </aside>

  );

};

export default Sidebar;