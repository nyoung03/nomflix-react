import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Search from "./routes/Search";
import SignUp from "./routes/SignUp";
import Tv from "./routes/Tv";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movies/:id" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/tvs/:id" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/:type/:id" element={<Search />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
