import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useState} from "react";
import AccessContainer from "./components/AccessContainer";
import Login from "./components/Login"
import Register from "./components/Register";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccessContainer/>}/>

        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
    </Router>

  );
}

export default App;
