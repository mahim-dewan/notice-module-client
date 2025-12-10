const isDev = process.env.NODE_ENV === "development";

/**
 * Handle API / network errors in a consistent way
 * @param {any} err 
 * @param {string} defaultMessage
 * @returns {{ success: boolean, message: string, error?: any }}
 */

export const handleApiError = (
  err,
  defaultMessage = "Something went wrong"
) => {
  let message = defaultMessage;

  // Network error (server down, unreachable)
  if (err.message && err.message.includes("Network Error")) {
    message = "Server is unreachable. Please try again later.";
  }

  // Timeout error
  if (err.code === "ECONNABORTED") {
    message = "Request timed out. Please try again.";
  }

  return {
    success: false,
    message,
    error: isDev ? err : null,
  };
};
