import React from 'react';

import {Play, Eye, Clock3 } from 'lucide-react';


import { useNavigate } from 'react-router-dom';

const VideoCard = ({
  video
}) => {

  const navigate = useNavigate();

  return (

    <div
      className="group relative cursor-pointer"
      onClick={() => navigate(`/video/${video.id}`)}
    >

      {/* OUTER GLOW */}

      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-cyan-500/0 via-pink-500/0 to-purple-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:from-cyan-500/40 group-hover:via-pink-500/40 group-hover:to-purple-500/40"></div>

      {/* CARD */}

      <div className="relative overflow-hidden rounded-[28px] border border-white/5 bg-[#0b1220] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-cyan-500/20 group-hover:shadow-[0_20px_80px_-20px_rgba(6,182,212,0.35)]">

        {/* IMAGE */}

        <div className="relative overflow-hidden">

          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/10 to-transparent opacity-70"></div>

          {/* REFLECTION */}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">

            <div className="absolute top-0 -left-[120%] w-[60%] h-full bg-white/20 blur-2xl rotate-12 group-hover:left-[140%] transition-all duration-1000"></div>

          </div>

          {/* PLAY BUTTON */}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">

            <button className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-110 transition-all duration-300">

              <Play
                size={26}
                className="text-white fill-white ml-1"
              />

            </button>

          </div>

          {/* CATEGORY */}

          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">

            {video.category}

          </div>

        </div>

        {/* CONTENT */}

        <div className="p-4">

          {/* TITLE */}

          <h3 className="text-white font-bold text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">

            {video.title}

          </h3>

          {/* INFO */}

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">

            <div className="flex items-center gap-1">

              <Eye size={14} />

              {video.views} views

            </div>

            <div className="flex items-center gap-1">

              <Clock3 size={14} />

              {video.date}

            </div>

          </div>

          {/* TAGS */}

          <div className="flex flex-wrap gap-2 mt-4">

            <span className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/10 text-[10px] text-cyan-400 font-medium">

              #VIDEO

            </span>

            <span className="px-2 py-1 rounded-full bg-pink-500/10 border border-pink-500/10 text-[10px] text-pink-400 font-medium">

              #TRENDING

            </span>

          </div>

        </div>

      </div>

    </div>

  );

};

export default VideoCard;