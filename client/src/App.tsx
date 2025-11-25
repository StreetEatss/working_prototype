import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import OwnerPortalPage from "./pages/OwnerPortal";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/owners" element={<OwnerPortalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


