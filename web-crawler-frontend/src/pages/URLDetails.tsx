import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUrlById } from "../api";
import type { URLRecord } from "../types/URLtable";
import BrokenLinksTable from "../components/BrokenLinksTable";
import DonutLinkChart from "../components/DonutLinkChart";
import BarLinkChart from "../components/BarLinkChart";

const URLDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = useState<URLRecord | null>(null);
  const [showDonut, setShowDonut] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await fetchUrlById(id);
        setUrl(res.data);
      } catch (err) {
        console.error("Failed to load URL", err);
      }
    };
    load();
  }, [id]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {!url ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-100 rounded" />
            <div className="h-20 bg-gray-100 rounded" />
            <div className="h-20 bg-gray-100 rounded" />
          </div>
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-gray-800">{url.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="bg-white rounded shadow p-4">
              <p className="font-medium text-gray-500">HTML Version</p>
              <p className="mt-1">{url.htmlVersion || "Unknown"}</p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <p className="font-medium text-gray-500">Status</p>
              <p className="mt-1 capitalize">{url.status}</p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <p className="font-medium text-gray-500">Total Links</p>
              <p className="mt-1">{url.internalLinks + url.externalLinks}</p>
            </div>
          </div>

          <div className="border rounded p-4 shadow bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Link Types
              </h3>
              <button
                onClick={() => setShowDonut(!showDonut)}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
              >
                Show {showDonut ? "Bar" : "Donut"} Chart
              </button>
            </div>
            {showDonut ? (
              <DonutLinkChart
                internal={url.internalLinks}
                external={url.externalLinks}
              />
            ) : (
              <BarLinkChart
                internal={url.internalLinks}
                external={url.externalLinks}
              />
            )}
          </div>

          <BrokenLinksTable links={url.brokenLinks} />
        </>
      )}
    </div>
  );
};

export default URLDetail;
