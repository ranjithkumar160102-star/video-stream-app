import React, { useState, useEffect } from 'react';

import VideoCard from '../components/VideoCard';

import { useAppContext } from '../context/AppContext';

import { VIDEOS } from '../data/mockData';

import {Play,ListMusic,Plus,Clock,MoreVertical,Trash2,Pencil } from 'lucide-react';
  
const Playlists = () => {

  const {playlists,createPlaylist, deletePlaylist, updatePlaylist } = useAppContext();
    
  const [allVideos, setAllVideos] = useState([]);

  const [activeMenuId, setActiveMenuId] = useState(null);

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {

    const load = async () => {

      setAllVideos(VIDEOS);

    };

    load();

  }, []);

  const handleRename = async (e, p) => {

    e.stopPropagation();

    const newTitle = prompt(
      "Enter new playlist name:",
      p.title
    );

    if (newTitle && newTitle !== p.title) {

      await updatePlaylist(
        p.id,
        { title: newTitle }
      );

    }

    setActiveMenuId(null);

  };

  const handleDelete = async (e, id) => {

    e.stopPropagation();

    if (window.confirm("Delete this playlist?")) {

      await deletePlaylist(id);

      if (selectedPlaylistId === id) {

        setSelectedPlaylistId(null);

      }

    }

    setActiveMenuId(null);

  };

  const selectedPlaylist =
    playlists.find(
      p => p.id === selectedPlaylistId
    );

  /* PLAYLIST DETAIL PAGE */

  if (selectedPlaylist) {

    const videoIds =
      selectedPlaylist.videos
        ? selectedPlaylist.videos
            .split(',')
            .filter(id => id)
        : [];

    const playlistVideos =
      allVideos.filter(v =>
        videoIds.includes(String(v.id))
      );

    return (

      <div className="space-y-8 animate-in fade-in duration-500">

        <div className="flex items-center gap-4">

          <button
            onClick={() => setSelectedPlaylistId(null)}
            className="p-2 hover:bg-gray-800 rounded-2xl transition"
          >

            <Play
              className="rotate-180"
              size={24}
            />

          </button>

          <div>

            <h1 className="text-3xl font-black">

              {selectedPlaylist.title}

            </h1>

            <p className="text-gray-400 text-sm">

              {videoIds.length} Videos

            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {playlistVideos.map((video) => (

            <VideoCard
              key={video.id}
              video={video}
            />

          ))}

        </div>

        {playlistVideos.length === 0 && (

          <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-3xl">

            <ListMusic size={60} />

            <p className="mt-4 font-bold">

              Playlist Empty

            </p>

          </div>

        )}

      </div>

    );

  }

  /* MAIN PLAYLIST PAGE */

  return (

    <div className="space-y-10 animate-in fade-in duration-700">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-black">

            My Playlists

          </h1>

          <p className="text-gray-400 text-sm">

            Manage your favorite video collections

          </p>

        </div>

        <button
          onClick={() => {

            const title =
              prompt("Playlist name");

            if (title) {

              createPlaylist(title);

            }

          }}
          className="flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-2xl font-bold transition"
        >

          <Plus size={20} />

          Create Playlist

        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {playlists.map((playlist) => {

          const videoIds =
            playlist.videos
              ? playlist.videos
                  .split(',')
                  .filter(id => id)
              : [];

          const firstVideo =
            allVideos.find(
              v =>
                String(v.id) === videoIds[0]
            );

          return (

            <div
              key={playlist.id}
              onClick={() =>
                setSelectedPlaylistId(
                  playlist.id
                )
              }
              className="group cursor-pointer space-y-4"
            >

              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-800">

                {firstVideo ? (

                  <img
                    src={firstVideo.thumbnail}
                    alt={playlist.title}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center">

                    <ListMusic
                      size={60}
                      className="text-gray-600"
                    />

                  </div>

                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">

                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">

                    <Play
                      size={24}
                      className="text-white fill-white ml-1"
                    />

                  </div>

                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 rounded-full text-xs font-bold">

                  {videoIds.length} Videos

                </div>

              </div>

              <div className="flex items-center justify-between px-2">

                <div>

                  <h3 className="font-bold text-lg group-hover:text-cyan-400 transition">

                    {playlist.title}

                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">

                    <Clock size={12} />

                    <span>

                      {new Date(
                        playlist.createdAt
                      ).toLocaleDateString()}

                    </span>

                  </div>

                </div>

                <div className="relative">

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      setActiveMenuId(
                        activeMenuId === playlist.id
                          ? null
                          : playlist.id
                      );

                    }}
                    className="p-2 hover:bg-gray-800 rounded-full transition"
                  >

                    <MoreVertical size={20} />

                  </button>

                  {activeMenuId === playlist.id && (

                    <div className="absolute right-0 top-full mt-2 w-44 bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden z-50">

                      <button
                        onClick={(e) =>
                          handleRename(e, playlist)
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition text-sm"
                      >

                        <Pencil size={16} />

                        Rename

                      </button>

                      <button
                        onClick={(e) =>
                          handleDelete(
                            e,
                            playlist.id
                          )
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-500 transition text-sm"
                      >

                        <Trash2 size={16} />

                        Delete

                      </button>

                    </div>

                  )}

                </div>

              </div>

            </div>

          );

        })}

      </div>

      {playlists.length === 0 && (

        <div className="flex flex-col items-center justify-center py-20 text-gray-500">

          <ListMusic size={70} />

          <p className="mt-4 text-lg font-bold">

            No playlists available

          </p>

        </div>

      )}

    </div>

  );

};

export default Playlists;