"use client";

import { api } from "@/lib/apis";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useNoticeQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ===========================
  //   STATE MANAGEMENT
  // ===========================
  const [noticeData, setNoticeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ===========================
  //   INITIAL VALUES FROM URL
  // ===========================
  const pageFromURL = Number(searchParams.get("page")) || 1;
  const statusFromURL = searchParams.getAll("status");
  const [currentPage, setCurrentPage] = useState(pageFromURL);

  // Determine initial selected statuses based on URL (fallback: all selected)
  const [published, setPublished] = useState(
    statusFromURL.includes("published") || statusFromURL.length === 0
  );
  const [unPublished, setUnpublished] = useState(
    statusFromURL.includes("unpublished") || statusFromURL.length === 0
  );
  const [draft, setDraft] = useState(
    statusFromURL.includes("draft") || statusFromURL.length === 0
  );

  // ===========================
  //   SINGLE-SELECT MODE
  // ===========================
  // Allows selecting exactly one status
  const statusSelect = (value) => {
    if (value === "published") {
      setPublished(true);
      setUnpublished(false);
      setDraft(false);
      setCurrentPage(1);
    }
    if (value === "unpublished") {
      setUnpublished(true);
      setPublished(false);
      setDraft(false);
      setCurrentPage(1);
    }
    if (value === "draft") {
      setPublished(false);
      setUnpublished(false);
      setDraft(true);
      setCurrentPage(1);
    }
  };

  // ===========================
  //   MULTI-SELECT TOGGLE
  // ===========================
  // Allows enabling/disabling multiple statuses
  const statusToggle = (key) => {
    if (key === "published") {
      setPublished(!published);
      setCurrentPage(1);
    }
    if (key === "unpublished") {
      setUnpublished(!unPublished);
      setCurrentPage(1);
    }
    if (key === "draft") {
      setDraft(!draft);
      setCurrentPage(1);
    }
  };

  // ===========================
  //   BUILD STATUS ARRAY
  // ===========================
  const buildStatusArray = () => {
    let filter = [];

    if (published) {
      filter.push("published");
    }
    if (unPublished) {
      filter.push("unpublished");
    }
    if (draft) {
      filter.push("draft");
    }

    return filter;
  };

  // ===========================
  //   SYNC STATE → URL
  // ===========================
  // Keeps page + filters reflected in URL for shareable links
  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", currentPage);

    const statuses = buildStatusArray();

    statuses.forEach((s) => params.append("status", s));

    router.replace(`/notices?${params.toString()}`);
  }, [currentPage, published, unPublished, draft]);

  // ===========================
  //   API FETCHER
  // ===========================
  // Fetch notices whenever filters or page changes
  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const notices = await api.getNotices({
          page: currentPage,
          status: buildStatusArray(),
        });
        console.log(notices);

        if (!notices.success) {
          setError(notices?.message);
          return;
        }
        setNoticeData(notices);
      } catch (err) {
        setError(err?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, [currentPage, published, unPublished, draft]);

  // ===========================
  //   RETURN HOOK API
  // ===========================
  return {
    noticeData,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    published,
    setPublished,
    unPublished,
    setUnpublished,
    draft,
    setDraft,
    statusSelect,
    statusToggle,
  };
};
