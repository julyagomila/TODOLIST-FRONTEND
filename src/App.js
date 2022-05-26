//PACKAGES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

//COMPOSANTS
// import Header from "./components/Header";

//PAGES
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
