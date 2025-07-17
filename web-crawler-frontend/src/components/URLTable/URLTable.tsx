import { useState } from "react";
import {
  type Filters,
  type SortDirection,
  type SortKey,
  type URLRecord,
} from "../../types/URLtable";
import Toolbar from "./Toolbar";
import { useFilteredSortedPaginatedUrls } from "../../hooks/useFilteredSortedPaginatedUrls";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { Pagination } from "./Pagination";

const PAGE_SIZE = 10;

type Props = {
  urls: URLRecord[];
  loadUrls: () => void;
};

const URLTable = ({ urls, loadUrls }: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [globalSearch, setGlobalSearch] = useState("");

  const [filters, setFilters] = useState<Filters>({
    title: "",
    htmlVersion: "",
    internalLinks: "",
    externalLinks: "",
    brokenLinks: "",
    status: "",
  });

  const { paginatedUrls, totalPages } = useFilteredSortedPaginatedUrls(
    urls,
    filters,
    globalSearch,
    sortKey,
    sortDirection,
    currentPage,
    PAGE_SIZE
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedUrls.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedUrls.map((u) => u.id));
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const onFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Toolbar selectedIds={selectedIds} loadUrls={loadUrls}></Toolbar>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <input
          type="text"
          placeholder="Search all columns..."
          value={globalSearch}
          onChange={(e) => {
            setGlobalSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded ml-3 mt-3 px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
        />

        <table className="w-full text-sm text-left">
          <TableHeader
            paginatedUrls={paginatedUrls}
            filters={filters}
            handleSort={handleSort}
            onFilterChange={onFilterChange}
            selectedIds={selectedIds}
            sortDirection={sortDirection}
            sortKey={sortKey}
            toggleSelectAll={toggleSelectAll}
          />
          <tbody>
            {paginatedUrls.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-400">
                  No URLs found.
                </td>
              </tr>
            ) : (
              <TableRow
                paginatedUrls={paginatedUrls}
                selectedIds={selectedIds}
                toggleSelect={toggleSelect}
              />
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </div>
  );
};

export default URLTable;
