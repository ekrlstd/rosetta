import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Survey from "./pages/Survey";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/survey" element={<Survey />} />
      
    </Routes>
  );
}
