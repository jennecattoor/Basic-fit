import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Coach from "./pages/Coach";
import Clubs from "./pages/Clubs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/clubs" element={<Clubs />} />
      </Routes>
    </div >
  );
}

export default App;
