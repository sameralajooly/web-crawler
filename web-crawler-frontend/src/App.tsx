import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import URLDetails from "./pages/URLDetails";

function App() {
  return (
    <div className="container mx-auto mt-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urls/:id" element={<URLDetails />} />
      </Routes>
    </div>
  );
}

export default App;
