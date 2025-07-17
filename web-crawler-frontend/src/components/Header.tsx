import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-4">
      <div className="p-6 max-w-6xl mx-auto space-y-6 mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-800 transition"
        >
          <Globe className="w-6 h-6" /> URL Crawler
        </Link>
      </div>
    </header>
  );
};

export default Header;
