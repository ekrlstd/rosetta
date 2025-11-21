import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Survey from "./pages/Survey";
import About from "./pages/About";
import Results from "./pages/Results";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/about" element={<About />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}
