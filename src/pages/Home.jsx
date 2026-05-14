import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import CategoryFilter from '../components/CategoryFilter';
import {Sparkles,Loader2, Play,Bookmark } from 'lucide-react';
import { VIDEOS } from '../data/mockData';

const Home = () => {

  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {

    try {

      setVideos(VIDEOS);

    } catch (err) {

      console.error("Failed to fetch videos", err);

    } finally {

      setLoading(false);

    }

  };

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter(
          (v) => v.category === selectedCategory
        );

  return (

    <div className="space-y-10 animate-in fade-in duration-700">

      {/* HERO SECTION */}

<div className="flex justify-center">

  <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1220] shadow-2xl w-full max-w-5xl">

    {/* GLOW */}

    <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full"></div>

    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-fuchsia-600/10 blur-3xl rounded-full"></div>

    <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-6 md:p-10">

      {/* LEFT CONTENT */}

      <div>

        {/* BADGE */}

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[10px] font-bold tracking-widest uppercase mb-5">

          <Sparkles
            size={12}
            className="fill-cyan-300"
          />

          Premium Streaming

        </div>

        {/* TITLE */}

        <h1 className="text-4xl md:text-6xl leading-tight text-white font-['Patrick_Hand']">

          <span className="block">
            Enjoy The
          </span>

          <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Best Videos
          </span>

        </h1>

        {/* DESCRIPTION */}

        <p className="mt-5 text-gray-300 text-sm md:text-base leading-relaxed max-w-md">

          Unlimited movies, music, gaming and trending entertainment videos
          in one futuristic streaming platform.

        </p>

        {/* BUTTONS */}

        <div className="flex gap-3 mt-7">

          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-sm font-bold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/20">

            <Play
              size={16}
              className="fill-white"
            />

            Explore Now

          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#151c2f] border border-white/10 text-white text-sm font-bold hover:bg-[#1d2740] transition-all duration-300">

            <Bookmark size={16} />

            My List

          </button>

        </div>

      </div>

      {/* RIGHT IMAGE */}

      <div className="relative">

        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop"
          alt="Hero"
          className="w-full h-[320px] object-cover rounded-[24px] border border-white/10 shadow-2xl"
        />

        {/* FLOATING CARD */}

        <div className="absolute -bottom-4 left-4 bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">

          <p className="text-white font-bold text-xs">
            Trending Now 
          </p>

          <p className="text-gray-400 text-[10px] mt-1">
            Movies • Music • Gaming
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

      {/* DISCOVERY SECTION */}

      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-black flex items-center gap-3">

            Discovery

            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />

          </h2>

          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

        </div>

        {loading ? (

          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">

            <Loader2
              className="animate-spin"
              size={40}
            />

            <p className="font-bold text-sm uppercase tracking-widest">

              Fetching content...

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">

            {filteredVideos.map((video) => (

              <VideoCard
                key={video.id}
                video={video}
              />

            ))}

          </div>

        )}

        {!loading && filteredVideos.length === 0 && (

          <div className="text-center py-20 text-gray-500">

            <p className="text-lg font-bold">

              No videos found in this category.

            </p>

            <p className="text-sm">

              Be the first to add one!

            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default Home;