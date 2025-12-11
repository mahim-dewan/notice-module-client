/**
 * getPaginationRange
 * -------------------
 * Generates a list of page numbers to display based on:
 *  - current page
 *  - total pages
 *  - fixed visible count (default: 5 pages)
 *
 * Example:
 *  currentPage=6, totalPages=12 → [4, 5, 6, 7, 8]
 */
export const getPaginationRange = (currentPage, totalPages) => {
  const visiableCount = 5;
  const half = Math.floor(visiableCount / 2);

  // Initial range around current page
  let start = currentPage - half;
  let end = currentPage + half;

  // -----------------------------
  //  ADJUST WHEN START < 1
  // -----------------------------
  // Clamp range to always start at 1
  if (start < 1) {
    start = 1;
    end = visiableCount;
  }

  // -----------------------------
  //  ADJUST WHEN END > totalPages
  // -----------------------------
  // Clamp range at the end
  if (totalPages < end) {
    end = totalPages;
    start = totalPages - visiableCount + 1;

    // If total pages < visiableCount → keep start at 1
    if (start < 1) start = 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
