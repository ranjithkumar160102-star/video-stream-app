import React, { useState, useEffect } from 'react';

import { useAppContext } from '../context/AppContext';

import { VIDEOS } from '../data/mockData';

import VideoCard from '../components/VideoCard';

import { Clock,Loader2,Trash2 } from 'lucide-react';
 
const Watchlist = () => {

  const {
    user,
    removeFromWatchLater
  } = useAppContext();

  const [watchlistItems, setWatchlistItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {

      fetchWatchLater();

    }

  }, [user]);

  const fetchWatchLater = async () => {

    setLoading(true);

    try {

      /* MOCK WATCHLIST */

      const mockWatchlist = [

        {
          id: "w1",
          video: VIDEOS[0]
        },

        {
          id: "w2",
          video: VIDEOS[1]
        },

        {
          id: "w3",
          video: VIDEOS[4]
        }

      ];

      setWatchlistItems(mockWatchlist);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const handleRemove = async (id) => {

    setWatchlistItems(

      watchlistItems.filter(
        item => item.id !== id
      )

    );

  };

  if (!user) {

    return (

      <div className="p-20 text-center">

        <h1 className="text-3xl font-black text-white mb-4">

          Login Required

        </h1>

        <p className="text-gray-400">

          Please login to access your watchlist

        </p>

      </div>

    );

  }

  return (

    <div className="space-y-10 animate-in fade-in duration-700">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-gray-800 pb-8">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400">

            <Clock size={32} />

          </div>

          <div>

            <h1 className="text-3xl font-black">

              Watch Later

            </h1>

            <p className="text-gray-400 text-sm">

              {watchlistItems.length} saved videos

            </p>

          </div>

        </div>

      </div>

      {/* LOADING */}

      {loading ? (

        <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">

          <Loader2
            className="animate-spin"
            size={40}
          />

          <p className="uppercase text-xs font-bold tracking-widest">

            Loading Watchlist...

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">

          {watchlistItems.map((item) => (

            <div
              key={item.id}
              className="relative group/item"
            >

              <VideoCard
                video={item.video}
              />

              <button
                onClick={() =>
                  handleRemove(item.id)
                }
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-red-500 text-white rounded-xl opacity-0 group-hover/item:opacity-100 transition-all"
              >

                <Trash2 size={16} />

              </button>

            </div>

          ))}

        </div>

      )}

      {/* EMPTY */}

      {!loading &&
        watchlistItems.length === 0 && (

        <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-3xl">

          <Clock
            size={60}
            strokeWidth={1}
          />

          <p className="mt-4 text-lg font-bold">

            Watchlist Empty

          </p>

          <p className="text-sm">

            Save videos to watch later

          </p>

        </div>

      )}

    </div>

  );

};

export default Watchlist;