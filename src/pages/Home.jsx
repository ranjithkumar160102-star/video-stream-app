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
  <div className="space-y-8 animate-in fade-in duration-700">

    {/* HERO SECTION */}
    <div className="relative h-64 md:h-80 rounded-[32px] overflow-hidden bg-gradient-to-r from-[#ff7b54] via-[#ff4ecd] to-[#7b2ff7]">

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* CURVE DESIGN */}
      <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-cyan-500/40 rounded-full blur-3xl"></div>

      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[300px] bg-purple-900/60 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] left-[300px] w-[400px] h-[250px] bg-pink-300/30 rounded-full blur-3xl"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-14">

        {/* PREMIUM TAG */}
        <div className="w-fit px-4 py-1 rounded-full bg-cyan-400 text-[10px] font-black uppercase tracking-[3px] text-white shadow-lg">
          Premium
        </div>

        {/* TITLE */}
        <h1 className="mt-5 text-5xl md:text-6xl font-black text-white leading-tight">
          Video Streaming
          <br />
          <span className="text-cyan-300">
            Platform
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="mt-4 text-gray-200 text-sm md:text-base max-w-xl font-medium">
          Watch trending movies, music, gaming and entertainment videos
          with stunning streaming experience.
        </p>

      </div>

    </div>

    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Discovery
          <span className="w-2 h-2 bg-cyan-500 rounded-2xl animate-pulse" />
        </h2>

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-4">
          <Loader2 className="animate-spin" size={40} />
          <p className="font-bold text-sm uppercase tracking-widest">
            Fetching content...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
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
