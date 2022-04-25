import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Coach from "./pages/Coach";
import Clubs from "./pages/Clubs";
import Workouts from "./pages/Workouts";
import WorkoutDetail from "./pages/WorkoutDetail";
import Login from './pages/Login';
import LoginRedirect from './pages/LoginRedirect';

function App() {
  if (!process.env.REACT_APP_BACKEND_URL) {
    return <p>
      Please specify your backend url with the <a href="https://create-react-app.dev/docs/adding-custom-environment-variables/" target="_blank" rel="noopener noreferrer">environment variable</a>:<br />
      <b>REACT_APP_BACKEND_URL</b>.<br />
      <br />
      For example launch this app with:<br />
      <b>REACT_APP_BACKEND_URL=http://localhost:1337 yarn start</b>
    </p>;
  }
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="coach" element={<Coach />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="workouts" element={<Workouts />} />
        </Route>
        <Route path="workoutdetail/:id" element={<WorkoutDetail />} />
      </Routes>
    </div >
  );
}

export default App;
