"use client";
import { Pagination } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationControlProps = {
  total: number;
  itemsPerPage: number;
  page: number;
};

const PaginationControl = ({
  total,
  itemsPerPage,
  page,
}: PaginationControlProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pagesTotal = Math.ceil(total / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    // clone the current params
    const params = new URLSearchParams(searchParams.toString());

    // set or remove the `page` param
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    // build the new URL and navigate
    const href = `${pathname}${params.toString() ? `?${params}` : ""}`;
    router.push(href);
  };

  return (
    <Pagination
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded mx-auto",
        item: "w-8 h-8 text-small rounded bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-primary/40 to-secondry text-white font-bold",
      }}
      total={pagesTotal}
      page={page}
      onChange={handlePageChange}
    />
  );
};

export default PaginationControl;
