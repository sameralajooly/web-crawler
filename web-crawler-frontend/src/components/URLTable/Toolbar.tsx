import { useState } from "react";
import { deleteUrls, reanalyzeUrls } from "../../api";

type Props = {
  selectedIds: number[];
  loadUrls: () => void;
};

const Toolbar = ({ selectedIds, loadUrls }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleReanalyzeUrls = async () => {
    setLoading(true);
    try {
      await reanalyzeUrls(selectedIds);
      await loadUrls();
    } catch (err) {
      console.error("Failed to re-run URLs", err);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUrls(selectedIds);
      await loadUrls();
    } catch (err) {
      console.error("Failed to delete URLs", err);
    }
    setLoading(false);
  };

  return (
    <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-2">
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={handleReanalyzeUrls}
          disabled={loading || selectedIds.length === 0}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow disabled:opacity-50 transition"
        >
          Re-run Analysis
        </button>
        <button
          onClick={handleDelete}
          disabled={loading || selectedIds.length === 0}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow disabled:opacity-50 transition"
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
