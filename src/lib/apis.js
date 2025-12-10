import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const isDev = process.env.NODE_ENV === "development";

export const api = {
  // Create a new notice
  createNotice: async (body) => {
    try {
      const res = await axios.post(`${BASE_API}/notices`, body);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: "Couldn't Create the Notice",
        error: isDev ? err : null,
      };
    }
  },

  // Get all notices
  getNotices: async () => {
    try {
      const res = await axios.get(`${BASE_API}/notices`);
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: "Couldn't Load Notices",
        error: isDev ? err : null,
      };
    }
  },
};
