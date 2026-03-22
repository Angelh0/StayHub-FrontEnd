/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";*/
import React, {useState} from "react";
import AccessContainer from "./components/AccessContainer";
import Login from "./components/Login"
import Register from "./components/Register";
import UpgradeOwner from "./components/UpgradeOwner";
import OwnerContainer from "./components/OwnerContainer";
import Home from "./components/Home";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (

    <Home/>

    /*<Router>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/" element={<AccessContainer/>}/>
        <Route path="/" element={<OwnerContainer/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/UpgradeOwner" element={<UpgradeOwner/>}/>
      </Routes>
    </Router>*/

  );
}

export default App;
