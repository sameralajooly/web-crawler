import { useState } from "react";

type Props = {
  onCrawl: (url: string) => Promise<void>;
};

const URLForm = ({ onCrawl }: Props) => {
  const [url, setURL] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      await onCrawl(url);
      setURL("");
      setFormError("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message =
        err?.response?.data?.error || "Failed to submit URL. Please try again.";
      setFormError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white p-4 rounded-xl shadow-sm border"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="url" className="text-sm font-medium text-gray-700">
          URL to Crawl
        </label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          placeholder="https://example.com"
          className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
            formError ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formError && <p className="text-red-600 text-sm">{formError}</p>}
        <button
          type="submit"
          name="crawl-btn"
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Crawl
        </button>
      </div>
    </form>
  );
};

export default URLForm;
