import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { SheetyService } from '../utils/sheetyService';
import { useAppContext } from '../context/AppContext';
import { ThumbsUp, ThumbsDown, Share2,User,CheckCircle, Send,Loader2,Trash2,Pencil,MoreVertical,Plus,Clock } from 'lucide-react';

import toast from 'react-hot-toast';
import VideoCard from '../components/VideoCard';
import { cn } from '../utils/cn';

const VideoDetail = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const [editValue, setEditValue] = useState("");

  const {
    user,
    addToWatchLater,
    playlists,
    updatePlaylist
  } = useAppContext();

  useEffect(() => {
    fetchVideoData();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchVideoData = async () => {
    setLoading(true);

    try {
      const v = await SheetyService.getVideoById(id);

      setVideo(v);

      const [
        allVideos,
        videoComments,
        likes,
        subs
      ] = await Promise.all([
        SheetyService.getVideos(),
        SheetyService.getComments(id),
        user ? SheetyService.getLikes(id) : [],
        user ? SheetyService.getSubscriptions(user.id) : []
      ]);

      setSuggested(
        allVideos.filter(item => item.id != id).slice(0, 6)
      );

      setComments(videoComments || []);

      if (user) {
        setIsLiked(
          likes.some(l => l.userId == user.id)
        );

        setIsSubscribed(
          subs.some(s => s.channelId == v.channelId)
        );
      }

    } catch (err) {
      toast.error("Failed to load video");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      return toast.error("Please login");
    }

    try {
      await SheetyService.toggleLike({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        videoId: id,
        createdAt: new Date().toISOString()
      });

      setIsLiked(true);

      toast.success("Liked!");

    } catch (err) {
      toast.error("Like failed");
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      return toast.error("Please login");
    }

    try {
      await SheetyService.toggleSubscription({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        channelId: video.channelId,
        createdAt: new Date().toISOString()
      });

      setIsSubscribed(true);

      toast.success("Subscribed!");

    } catch (err) {
      toast.error("Subscribe failed");
    }
  };

  const handlePostComment = async () => {
    if (!user) {
      return toast.error("Login first");
    }

    if (!newComment.trim()) return;

    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      videoId: id,
      userId: user.id,
      username: user.username,
      content: newComment,
      createdAt: new Date().toISOString()
    };

    try {
      const savedComment = await SheetyService.addComment(comment);

      setComments([
        ...comments,
        savedComment || comment
      ]);

      setNewComment("");

      toast.success("Comment posted");

    } catch (err) {
      toast.error("Comment failed");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await SheetyService.deleteComment(commentId);

      setComments(
        comments.filter(c => c.id !== commentId)
      );

      toast.success("Deleted");

    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editValue.trim()) return;

    try {
      await SheetyService.updateComment(commentId, {
        content: editValue
      });

      setComments(
        comments.map(c =>
          c.id === commentId
            ? { ...c, content: editValue }
            : c
        )
      );

      setEditingCommentId(null);

      toast.success("Updated");

    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handlePlaylistAdd = async (playlist) => {
    const videoIds = playlist.videos
      ? playlist.videos.split(',')
      : [];

    if (videoIds.includes(id)) {
      toast.error("Already added");
      return;
    }

    const updatedVideos = [...videoIds, id].join(',');

    await updatePlaylist(playlist.id, {
      videos: updatedVideos
    });

    toast.success("Added to playlist");

    setShowPlaylistMenu(false);
    setShowMoreMenu(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2
          className="animate-spin text-rose-500"
          size={48}
        />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="p-10 text-center">
        Video not found
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto">

      {/* LEFT */}
      <div className="flex-1 space-y-6">

        {/* PLAYER */}
        <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">

          {video?.youtubeVideoId ? (
            <YouTube
              videoId={video.youtubeVideoId}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1
                }
              }}
              className="w-full h-full"
              containerClassName="w-full h-full"
            />
          ) : (
            <video
              src={video?.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          )}

        </div>

        {/* TITLE */}
        <div className="space-y-4">

          <h1 className="text-2xl md:text-3xl font-black">
            {video.title}
          </h1>

          {/* ACTION BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-gray-800/50">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-indigo-500 flex items-center justify-center font-bold">
                {video.category?.[0] || 'V'}
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-bold">
                  {video.category} Content

                  <CheckCircle
                    size={14}
                    className="text-blue-500 fill-blue-500"
                  />
                </div>

                <div className="text-xs text-gray-400">
                  Platform Verified
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className={cn(
                  "ml-4 px-6 py-2 font-bold rounded-2xl text-sm transition-all",
                  isSubscribed
                    ? "bg-gray-800 text-gray-400 border border-gray-700"
                    : "bg-white text-black hover:bg-gray-200"
                )}
              >
                {isSubscribed
                  ? 'Subscribed'
                  : 'Subscribe'}
              </button>

            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex items-center gap-2">

              <div className="flex bg-[#111827] rounded-2xl border border-gray-700/50 overflow-hidden">

                <button
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 border-r border-gray-700/50 transition-colors",
                    isLiked
                      ? "text-rose-500 bg-cyan-500/10"
                      : "hover:bg-gray-700/30"
                  )}
                >
                  <ThumbsUp
                    size={18}
                    fill={isLiked ? "currentColor" : "none"}
                  />

                  <span className="text-sm font-bold">
                    {isLiked ? 'Liked' : 'Like'}
                  </span>

                </button>

                <button className="px-4 py-2 hover:bg-gray-700/30">
                  <ThumbsDown size={18} />
                </button>

              </div>

              <button className="flex items-center gap-2 bg-[#111827] px-4 py-2 rounded-2xl border border-gray-700/50 hover:bg-gray-700/30">
                <Share2 size={18} />
              </button>

              {/* MENU */}
              <div className="relative">

                <button
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className="p-2.5 bg-[#111827] rounded-2xl border border-gray-700/50 hover:bg-gray-700/30"
                >
                  <MoreVertical size={20} />
                </button>

                {showMoreMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">

                    <button
                      onClick={() => {
                        addToWatchLater(id);
                        setShowMoreMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold hover:bg-white/5"
                    >
                      <Clock size={16} />
                      Save to Watch Later
                    </button>

                    <button
                      onClick={() => {
                        setShowPlaylistMenu(!showPlaylistMenu);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold hover:bg-white/5"
                    >
                      <Plus size={16} />
                      Save to Playlist
                    </button>

                    {showPlaylistMenu && (
                      <div className="border-t border-white/10">

                        {playlists.map(p => (
                          <button
                            key={p.id}
                            onClick={() => handlePlaylistAdd(p)}
                            className="w-full text-left px-8 py-2 text-xs hover:bg-cyan-500/10"
                          >
                            • {p.title}
                          </button>
                        ))}

                      </div>
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="bg-gray-800/30 rounded-3xl p-6 border border-gray-700/30">

          <div className="flex items-center gap-2 text-sm font-bold mb-4">
            <span>{video.views} views</span>

            <span className="w-1 h-1 bg-gray-500 rounded-full" />

            <span>
              {new Date(video.createdAt).toLocaleDateString()}
            </span>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            {video.description}
          </p>

        </div>

        {/* COMMENTS */}
        <div className="space-y-6">

          <h3 className="text-xl font-black">
            {comments.length} Comments
          </h3>

          {/* INPUT */}
          <div className="flex gap-4">

            <div className="w-10 h-10 rounded-2xl bg-gray-700 flex items-center justify-center">
              <User size={20} />
            </div>

            <div className="flex-1 relative">

              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full bg-transparent border-b border-gray-800 py-2 pr-12 outline-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handlePostComment()
                }
              />

              <button
                onClick={handlePostComment}
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                <Send size={18} />
              </button>

            </div>

          </div>

          {/* COMMENTS LIST */}
          <div className="space-y-6">

            {comments.map(comment => (

              <div key={comment.id} className="flex gap-4">

                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs">
                  {comment.username?.[0] || 'U'}
                </div>

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-rose-400">
                        @{comment.username}
                      </span>

                      <span className="text-[10px] text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {user && user.id == comment.userId && (

                      <div className="relative">

                        <button
                          onClick={() =>
                            setActiveMenuId(
                              activeMenuId === comment.id
                                ? null
                                : comment.id
                            )
                          }
                        >
                          <MoreVertical size={16} />
                        </button>

                        {activeMenuId === comment.id && (

                          <div className="absolute right-0 top-full mt-1 w-32 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">

                            <button
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditValue(comment.content);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-800"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              onClick={() => {
                                handleDeleteComment(comment.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-800 text-rose-500"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>

                          </div>

                        )}

                      </div>

                    )}

                  </div>

                  {editingCommentId === comment.id ? (

                    <div className="space-y-3 mt-2">

                      <textarea
                        className="w-full bg-gray-900 rounded-xl px-4 py-3 text-sm"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        rows={2}
                      />

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleUpdateComment(comment.id)
                          }
                          className="px-3 py-1 bg-white text-black rounded-xl text-xs"
                        >
                          Save
                        </button>

                        <button
                          onClick={() =>
                            setEditingCommentId(null)
                          }
                          className="px-3 py-1 bg-gray-800 rounded-xl text-xs"
                        >
                          Cancel
                        </button>

                      </div>

                    </div>

                  ) : (

                    <p className="text-sm text-gray-300 mt-2">
                      {comment.content}
                    </p>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full lg:w-[400px] space-y-4">

        <h2 className="text-lg font-bold">
          Up Next
        </h2>

        <div className="flex flex-col gap-6">

          {suggested.map(v => (
            <VideoCard
              key={v.id}
              video={v}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default VideoDetail;