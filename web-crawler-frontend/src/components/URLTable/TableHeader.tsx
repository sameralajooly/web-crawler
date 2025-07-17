import { ChevronDown, ChevronUp } from "lucide-react";
import type { Filters, SortKey, URLRecord } from "../../types/URLtable";

type Props = {
  paginatedUrls: URLRecord[];
  filters: Filters;
  selectedIds: number[];
  sortKey: keyof URLRecord | null;
  sortDirection: "asc" | "desc";
  toggleSelectAll: () => void;
  handleSort: (key: SortKey) => void;
  onFilterChange: (key: keyof Filters, value: string) => void;
};
const TableHeader = ({
  paginatedUrls,
  filters,
  selectedIds,
  sortKey,
  sortDirection,
  toggleSelectAll,
  handleSort,
  onFilterChange,
}: Props) => {
  const SortIcon = (column: SortKey) =>
    sortKey === column ? (
      sortDirection === "asc" ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )
    ) : null;
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="p-3">
          <input
            type="checkbox"
            onChange={toggleSelectAll}
            checked={
              selectedIds.length === paginatedUrls.length &&
              paginatedUrls.length > 0
            }
          />
        </th>
        {[
          { key: "title", label: "Title" },
          { key: "htmlVersion", label: "HTML Version" },
          { key: "internalLinks", label: "#Internal Links" },
          { key: "externalLinks", label: "#External Links" },
          { key: "brokenLinks", label: "#Broken Links" },
          { key: "status", label: "Status" },
        ].map((col) => (
          <th
            key={col.key}
            className="p-3 cursor-pointer select-none md:w-1/6"
            onClick={() => handleSort(col.key as keyof Filters)}
          >
            <div className="flex items-center gap-1">
              {col.label}
              {SortIcon(col.key as keyof Filters)}
            </div>
          </th>
        ))}
      </tr>

      <tr className="bg-gray-100">
        <th></th>
        <th className="p-2">
          <input
            type="text"
            value={filters.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
            placeholder="Filter title..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </th>
        <th className="p-2">
          <input
            type="text"
            value={filters.htmlVersion}
            onChange={(e) => onFilterChange("htmlVersion", e.target.value)}
            placeholder="Filter HTML version..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </th>
        <th className="p-2">
          <input
            type="number"
            value={filters.internalLinks}
            onChange={(e) => onFilterChange("internalLinks", e.target.value)}
            placeholder="Filter internal links..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </th>
        <th className="p-2">
          <input
            type="number"
            value={filters.externalLinks}
            onChange={(e) => onFilterChange("externalLinks", e.target.value)}
            placeholder="Filter external links..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </th>
        <th className="p-2">
          <input
            type="number"
            value={filters.brokenLinks}
            onChange={(e) => onFilterChange("brokenLinks", e.target.value)}
            placeholder="Filter broken links..."
            className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
          />
        </th>
        <th className="p-2">
          <select
            value={filters.status}
            onChange={(e) => {
              onFilterChange("status", e.target.value);
            }}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="">All Statuses</option>
            <option value="queued">Queued</option>
            <option value="running">Running</option>
            <option value="done">Done</option>
            <option value="error">Error</option>
          </select>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
