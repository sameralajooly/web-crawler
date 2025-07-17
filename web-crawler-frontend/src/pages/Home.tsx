import { crawlUrl } from "../api";
import URLForm from "../components/URLForm";

const Home = () => {
  const handleCrawl = async (url: string) => {
    try {
      await crawlUrl(url);
    } catch (err) {
      console.error("Crawl failed:", err);
      throw err;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <URLForm onCrawl={handleCrawl} />
    </div>
  );
};

export default Home;
