/**
 * initialNoticeState
 * ------------------
 * Holds notice list, filter switches, pagination info,
 * and network state (loading/error).
 */
export const initialNoticeState = {
  noticeData: null,
  isLoading: false,
  error: null,

  // filters
  published: true,
  unPublished: true,
  draft: true,

  // pagination
  currentPage: 1,
};

/**
 * noticeReducer
 * -------------
 * Handles all filter, pagination, and data state changes.
 */
export const noticeReducer = (state, action) => {
  switch (action.type) {
    // Set loading (boolean)
    case "set_loading":
      return { ...state, isLoading: action.payload };

    // Set error (string or null)
    case "set_error":
      return { ...state, error: action.payload };

    // Update API notice response
    case "set_noticeData":
      return { ...state, noticeData: action.payload };

    // Change current page
    case "set_page":
      return { ...state, currentPage: action.payload };

    // Set status from select box
    case "set_status":
      return {
        ...state,
        published: action.payload === "published",
        unPublished: action.payload === "unpublished",
        draft: action.payload === "draft",
        currentPage: 1,
      };

    // Set toggleStatus
    case "set_toggleStatus":
      return {
        ...state,
        [action.payload]: !state[action.payload],
        currentPage: 1,
      };

    /**
     * reset_filter
     * -------------
     * Only resets filter-related fields.
     * Keeps noticeData, loading state, and pagination intact.
     */
    case "reset_filter":
      return {
        ...initialNoticeState,
        noticeData: state.noticeData,
        isLoading: state.isLoading,
        error: state.error,
      };

    default:
      return state;
  }
};
