"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { initialNoticeState, noticeReducer } from "./noticeReducer";
import { useRouter } from "next/navigation";
import { setError, setIsLoading, setNoticeData } from "./noticeActions";
import { api } from "@/lib/apis";

const NoticeContext = createContext(null);

// ========================================
//           PROVIDER COMPONENT
// ========================================
const NoticeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noticeReducer, initialNoticeState);

  const router = useRouter();

  // ===========================
  //   BUILD STATUS ARRAY
  // ===========================
  const buildStatusArray = () => {
    let filter = [];

    if (state.published) {
      filter.push("published");
    }
    if (state.unPublished) {
      filter.push("unpublished");
    }
    if (state.draft) {
      filter.push("draft");
    }

    return filter;
  };

 // =======================================================
  //   INITIAL SYNC: Read filters & page from URL on mount
  // =======================================================
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", state.currentPage);

    const statuses = buildStatusArray();

    statuses.forEach((s) => params.append("status", s));

    router.replace(`/notices?${params.toString()}`);
  }, [state.currentPage, state.published, state.unPublished, state.draft]);

  // =======================================================
  //   FETCH NOTICES WHEN FILTER OR PAGE CHANGES
  // =======================================================
  useEffect(() => {
    const fetchNotices = async () => {
      dispatch(setIsLoading(true));
      dispatch(setError(null));

      try {
        const notices = await api.getNotices({
          page: state.currentPage,
          status: buildStatusArray(),
        });

        if (!notices.success) {
          dispatch(setError(notices?.message));
          return;
        }
        dispatch(setNoticeData(notices));
      } catch (err) {
        dispatch(setError(err?.message || "Something went wrong"));
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    fetchNotices();
  }, [state.currentPage, state.published, state.unPublished, state.draft]);

  return (
    <NoticeContext.Provider value={{ state, dispatch }}>
      {children}
    </NoticeContext.Provider>
  );
};

// Custom Hook
export const useNotice = () => useContext(NoticeContext);

export default NoticeProvider;
