import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getYouTubeId, getYouTubeThumbnail } from '../utils/youtube';
import { GeminiService } from '../utils/geminiService';
import { SheetyService } from '../utils/sheetyService';
import { Youtube, Sparkles, Brain, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateVideo = () => {
  const [url, setUrl] = useState('');
  const [metadata, setMetadata] = useState({ title: '', description: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const { user, channel } = useAppContext();
  const navigate = useNavigate();

  const handleURLChange = (val) => {
    setUrl(val);
    const id = getYouTubeId(val);
    if (!id) return;
    // Potentially fetch title from YouTube API if user had API key, 
    // for now we'll let them input or assume Gemini will help.
  };

  const handleAnalyze = async () => {
    if (!metadata.title) return toast.error("Please enter a title first");
    setIsAnalyzing(true);
    try {
      const result = await GeminiService.classifyVideo(metadata.title, metadata.description);
      setPrediction(result);
      toast.success("AI Analysis Complete!");
    } catch (err) {
      toast.error("AI Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ytId = getYouTubeId(url);
    if (!ytId) return toast.error("Invalid YouTube URL");
    if (!channel) return toast.error("You need a channel to post videos");

    const videoData = {
      id: Math.random().toString(36).substr(2, 9),
      channelId: channel.id,
      youtubeVideoId: ytId,
      title: metadata.title,
      description: metadata.description,
      thumbnail: getYouTubeThumbnail(ytId),
      tag: prediction ? prediction.tags.join(',') : '',
      category: prediction ? prediction.category : 'General',
      views: 0,
      createdAt: new Date().toISOString()
    };

    try {
      await SheetyService.addVideo(videoData);
      toast.success("Video added to your channel!");
      navigate('/');
    } catch (err) {
      toast.error("Failed to save video");
    }
  };

  if (!user) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please log in to add videos</h2>
        <button onClick={() => navigate('/auth')} className="bg-cyan-500px-6 py-2 rounded-xl font-bold">Sign In</button>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20">
          <Youtube className="mx-auto mb-4 text-rose-500" size={48} />
          <h2 className="text-2xl font-black mb-2">Create Your Channel</h2>
          <p className="text-gray-400 text-sm">You need a channel to start curating and sharing YouTube content.</p>
        </div>
        <button 
          onClick={async () => {
             try {
               await SheetyService.createChannel({
                 id: Math.random().toString(36).substr(2, 9),
                 ownerId: user.id,
                 name: `${user.username}'s Hub`,
                 description: 'Curated content hub',
                 createdAt: new Date().toISOString()
               });
               toast.success("Channel created!");
               window.location.reload();
             } catch(err) {
               toast.error("Failed to create channel");
             }
          }}
          className="w-full bg-cyan-500py-4 rounded-2xl font-bold shadow-lg shadow-cyan-500/20"
        >
          Initialize Channel
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-cyan-500p-3 rounded-2xl shadow-lg shadow-cyan-500/20">
          <Plus className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black">Upload Entertainment Video</h1>
          <p className="text-gray-400"></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900/50 border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">YouTube URL</label>
              <div className="relative">
                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-gray-800 rounded-xl py-3 pl-12 pr-4 outline-none border border-transparent focus:border-rose-500/50 transition-all"
                  value={url}
                  onChange={(e) => handleURLChange(e.target.value)}
                />
              </div>
            </div>Upload trending YouTube content to your streaming platform.

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Video Title</label>
              <input
                type="text"
                placeholder="Enter video title"
                className="w-full bg-gray-800 rounded-xl py-3 px-4 outline-none border border-transparent focus:border-rose-500/50 transition-all"
                value={metadata.title}
                onChange={(e) => setMetadata({...metadata, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Description</label>
              <textarea
                placeholder="What is this video about?"
                rows={4}
                className="w-full bg-gray-800 rounded-xl py-3 px-4 outline-none border border-transparent focus:border-rose-500/50 transition-all resize-none"
                value={metadata.description}
                onChange={(e) => setMetadata({...metadata, description: e.target.value})}
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-cyan-500 hover:bg-cyan-600 font-bold py-4 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all"
          >
           Upload Video
          </button>
        </div>

        <div className="space-y-6">
          {/* Preview Card */}
          <div className="bg-gray-900 p-4 rounded-3xl border border-white/5 space-y-4">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Preview</h3>
             {getYouTubeId(url) ? (
               <img src={getYouTubeThumbnail(getYouTubeId(url))} className="w-full aspect-video object-cover rounded-2xl" />
             ) : (
               <div className="aspect-video bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600">
                  <Youtube size={40} />
               </div>
             )}
             <div className="font-bold">{metadata.title || 'Video Title'}</div>
          </div>

          {/* AI Panel */}
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-indigo-400" size={20} />
              <h3 className="font-black text-indigo-400 uppercase text-xs tracking-widest">Smart Video Analyzer</h3>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Use Google Gemini to automatically predict the best category and tags for your video.
            </p>

            {prediction ? (
              <div className="space-y-3">
                <div className="bg-indigo-600/20 p-3 rounded-xl border border-indigo-500/30">
                   <div className="text-[10px] font-bold text-gray-500 uppercase">Category</div>
                   <div className="text-white font-bold">{prediction.category}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prediction.tags.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold text-indigo-300 border border-white/10">#{t}</span>
                  ))}
                </div>
                <button onClick={() => setPrediction(null)} className="text-xs text-gray-500 hover:text-white underline transition-colors">Reset</button>
              </div>
            ) : (
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                {isAnalyzing ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-2xl animate-spin" /> : <Brain size={18} />}
                Classify with Gemini
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;