// ===================
// All Action Creator
// ===================

// Set loading state (true/false)
export const setIsLoading = (value) => ({
  type: "set_loading",
  payload: value,
});

// Set error message (string or null)
export const setError = (value) => ({ type: "set_error", payload: value });

// Set notice API response data
export const setNoticeData = (value) => ({
  type: "set_noticeData",
  payload: value,
});

// Set current page number
export const setPage = (value) => ({ type: "set_page", payload: value });

// Set selected statuses
export const setStatus = (value) => ({ type: "set_status", payload: value });

// Toggle a status
export const setToggleStatus = (value) => ({
  type: "set_toggleStatus",
  payload: value,
});

// Reset all filters to default state
export const resetFilter = () => ({ type: "reset_filter" });
