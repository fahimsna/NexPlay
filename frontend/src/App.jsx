import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UpcomingContent from "./pages/UpcomingContent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<UpcomingContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
