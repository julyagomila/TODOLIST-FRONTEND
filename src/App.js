//PACKAGES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "animate.css";

//PAGES
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Todolist from "./pages/Todolist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/todolist" element={<Todolist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
