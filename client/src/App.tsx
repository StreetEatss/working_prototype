import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import OwnerPortalPage from "./pages/OwnerPortal";
import TruckDetailPage from "./pages/TruckDetailPage";
import "./App.css";

function App() {
  // Use HashRouter for GitHub Pages compatibility
  // HashRouter uses hash-based routing (#/) which works with static hosting
  // URLs will be: /#/ and /#/owners
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/owners" element={<OwnerPortalPage />} />
        <Route path="/trucks/:truckId" element={<TruckDetailPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;


