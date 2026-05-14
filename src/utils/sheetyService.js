import { VIDEOS } from "../data/mockData";

export const SheetyService = {

  // GET ALL VIDEOS
  getVideos: async () => {
    return VIDEOS;
  },

  // GET SINGLE VIDEO
  getVideoById: async (id) => {
    return VIDEOS.find(
      (video) => String(video.id) === String(id)
    );
  },

  // COMMENTS
  getComments: async (videoId) => {
    return [];
  },

  addComment: async (comment) => {
    return comment;
  },

  deleteComment: async (id) => {
    return true;
  },

  updateComment: async (id, data) => {
    return true;
  },

  // LIKES
  getLikes: async () => {
    return [];
  },

  toggleLike: async () => {
    return true;
  },

  // SUBSCRIPTIONS
  getSubscriptions: async () => {
    return [];
  },

  toggleSubscription: async () => {
    return true;
  },

  // WATCH LATER
  getWatchLater: async () => {
    return [];
  }
};