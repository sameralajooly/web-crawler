import { useNavigate } from "react-router-dom";
import type { URLRecord } from "../../types/URLtable";
import { StatusBadge } from "./StatusBadge";

type Props = {
  paginatedUrls: URLRecord[];
  selectedIds: number[];
  toggleSelect: (id: number) => void;
};

const TableRow = ({ paginatedUrls, selectedIds, toggleSelect }: Props) => {
  const navigate = useNavigate();

  return paginatedUrls.map((url, idx) => (
    <tr
      key={url.id}
      onClick={() => navigate(`/urls/${url.id}`)}
      className={`cursor-pointer hover:bg-blue-50 transition ${
        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      <td className="p-3" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={selectedIds.includes(url.id)}
          onChange={() => toggleSelect(url.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="p-3 md:w-1/6">{url.title}</td>
      <td className="p-3">{url.htmlVersion}</td>
      <td className="p-3">{url.internalLinks}</td>
      <td className="p-3">{url.externalLinks}</td>
      <td className="p-3">{url.brokenLinks?.length}</td>
      <td className="p-3">
        <StatusBadge status={url.status} />
      </td>
    </tr>
  ));
};

export default TableRow;
