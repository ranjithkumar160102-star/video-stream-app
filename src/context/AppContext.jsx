import React, { createContext, useContext, useState, useEffect } from 'react';
import { SheetyService } from '../utils/sheetyService';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [channel, setChannel] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchUserChannel(user.id);
      fetchPlaylists(user.id);
    } else {
      localStorage.removeItem('user');
      setChannel(null);
      setPlaylists([]);
    }
  }, [user]);

  const fetchUserChannel = async (userId) => {
    try {
      const result = await SheetyService.getChannelByOwner(userId);
      if (result && result.length > 0) {
        setChannel(result[0]);
      }
    } catch (err) {
      console.error("Failed to fetch channel", err);
    }
  };

  const fetchPlaylists = async (userId) => {
    try {
      const data = await SheetyService.getPlaylists(userId);
      setPlaylists(data || []);
    } catch (err) {
      console.error("Failed to fetch playlists", err);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const users = await SheetyService.getUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        setUser(foundUser);
        toast.success(`Welcome back, ${foundUser.username}!`);
        return true;
      }
      toast.error("Invalid credentials");
      return false;
    } catch (err) {
      toast.error("Login failed. Check your API URL.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const newUser = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      await SheetyService.addUser(newUser);
      setUser(newUser);
      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      toast.error("Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out");
  };

  // Watch Later
  const addToWatchLater = async (videoId) => {
    if (!user) return toast.error("Log in to save videos");
    try {
      await SheetyService.addToWatchLater({
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        videoId,
        addedAt: new Date().toISOString()
      });
      toast.success("Added to Watch Later");
    } catch (err) {
      toast.error("Failed to add to Watch Later");
    }
  };

  const removeFromWatchLater = async (id) => {
    try {
      await SheetyService.removeFromWatchLater(id);
      toast.success("Removed from watchlist");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  // Playlists
  const createPlaylist = async (title) => {
    if (!user) return toast.error("Log in to create playlists");
    try {
      const newPlaylist = {
        id: Math.random().toString(36).substr(2, 9),
        userId: user.id,
        title,
        videos: "", // Sheety stores strings better for CSV fields or relations
        createdAt: new Date().toISOString()
      };
      const saved = await SheetyService.createPlaylist(newPlaylist);
      setPlaylists([...playlists, saved || newPlaylist]);
      toast.success("Playlist created");
    } catch (err) {
      toast.error("Failed to create playlist");
    }
  };

  const deletePlaylist = async (id) => {
    try {
      await SheetyService.deletePlaylist(id);
      setPlaylists(playlists.filter(p => p.id !== id));
      toast.success("Playlist deleted");
    } catch (err) {
      toast.error("Failed to delete playlist");
    }
  };

  const updatePlaylist = async (id, data) => {
    try {
      const updated = await SheetyService.updatePlaylist(id, data);
      setPlaylists(playlists.map(p => p.id === id ? { ...p, ...data } : p));
      toast.success("Playlist updated");
    } catch (err) {
      toast.error("Failed to update playlist");
    }
  };

  return (
    <AppContext.Provider value={{ user,  channel,playlists,isLoading,login,  register,logout, addToWatchLater,removeFromWatchLater,  createPlaylist,deletePlaylist,updatePlaylist,fetchPlaylists }}>
    
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);