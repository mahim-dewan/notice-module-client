import { handleApiError } from "@/utils/apiErrorHandler";
import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;

export const api = {
  // Create a new notice
  createNotice: async (body) => {
    try {
      const res = await axios.post(`${BASE_API}/notices`, body);
      return res.data;
    } catch (err) {
      return handleApiError(err, "Couldn't Create the Notice");
    }
  },

  // Get all notices
  getNotices: async () => {
    try {
      const res = await axios.get(`${BASE_API}/notices`);
      return res.data;
    } catch (err) {
      return handleApiError(err, "Couldn't Load Notices");
    }
  },

  // Upload Images
  uploadAttaches: async (formData) => {
    try {
      const res = await axios.post(`${BASE_API}/uploads/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {      
      return handleApiError(err, "Attachments can't upload");
    }
  },
};
