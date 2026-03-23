
import {Routes,Route} from "react-router";
import Dashboard from "./Dashboard";
import LandingPage from "./components/LandingPage";


export default function App() {

  return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
  );
}