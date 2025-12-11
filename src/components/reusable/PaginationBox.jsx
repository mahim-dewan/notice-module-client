"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPaginationRange } from "@/utils/getPaginationRange";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaginationBox = ({ totalPages, currentPage, setCurrentPage }) => {
  const searchparams = useSearchParams();
  const router = useRouter();

  // ===========================
  //   SYNC PAGE STATE FROM URL
  // ===========================
  // When component mounts → read ?page= from URL
  // Ensures correct active page when user refreshes or shares link
  useEffect(() => {
    setCurrentPage(parseInt(searchparams.get("page")) || 1);
  }, []);

  // Generate page number list (ex: 1 ... 4 5 6 ... 20)
  const pageRange = getPaginationRange(currentPage, totalPages);

  // ===========================
  //   HANDLE PAGE CHANGE
  // ===========================
  const handlePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    // Update URL query params
    const params = new URLSearchParams(searchparams.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`, { shallow: true });
  };

  return (
    <Pagination className={"my-10"}>
      <PaginationContent>
        {/* Prev Button */}
        <PaginationItem>
          <ArrowLeft
            onClick={() => handlePage(currentPage - 1)}
            className={`mr-[31px] ${
              1 === currentPage
                ? "text-gray-blue cursor-not-allowed"
                : "text-dark-navy cursor-pointer"
            }`}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageRange?.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              className={`${
                currentPage === page &&
                "border border-primary-blue text-primary-blue"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <ArrowRight
            onClick={() => handlePage(currentPage + 1)}
            className={`ml-[31px] ${
              totalPages === currentPage
                ? "text-gray-blue cursor-not-allowed"
                : "text-dark-navy cursor-pointer"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBox;
