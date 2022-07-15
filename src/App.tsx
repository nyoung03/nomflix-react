import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Search from "./routes/Search";
import SignUp from "./routes/SignUp";
import Tv from "./routes/Tv";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/movie" element={<Home />}>
          <Route path="/movie/:id" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="/tv/:id" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/:type/:id" element={<Search />}></Route>
        <Route path={`/`} element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
