import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Coach from "./pages/Coach";
import Clubs from "./pages/Clubs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="coach" element={<Coach />} />
          <Route path="clubs" element={<Clubs />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
