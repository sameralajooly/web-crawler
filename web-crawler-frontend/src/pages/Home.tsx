import { useEffect, useState } from "react";
import { crawlUrl, fetchUrls } from "../api";
import URLForm from "../components/URLForm";
import type { URLRecord } from "../types/URLtable";
import URLTable from "../components/URLTable/URLTable";

const Home = () => {
  const [urls, setUrls] = useState<URLRecord[]>([]);

  const loadUrls = async () => {
    try {
      const { data } = await fetchUrls();

      const records = data.map((record: URLRecord) => ({
        ...record,
        title: record.title || record.url,
      }));

      setUrls(records);
    } catch (err) {
      console.error("Failed to load URLs:", err);
    }
  };

  const handleCrawl = async (url: string) => {
    try {
      await crawlUrl(url);
      await loadUrls();
    } catch (err) {
      console.error("Crawl failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <URLForm onCrawl={handleCrawl} />
      <URLTable urls={urls} loadUrls={loadUrls} />
    </div>
  );
};

export default Home;
