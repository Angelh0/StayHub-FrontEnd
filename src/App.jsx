import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, {useState} from "react";
import AccessContainer from "./components/Access/AccessContainer";
import Login from "./components/Access/Login"
import Register from "./components/Access/Register";
import UpgradeOwner from "./components/Access/UpgradeOwner";
import OwnerContainer from "./components/Access/OwnerContainer";
import HomeContainer from "./components/Home/HomeContainer";

function App() {
  const [showLogin, setShowLogin] = useState(true);

return (
        <Router>
          <Routes>
            <Route path="/" element={<HomeContainer/>}/>
            <Route path="/AccessContainer" element={<AccessContainer/>}/>
            <Route path="/" element={<OwnerContainer/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Register" element={<Register/>}/>
            <Route path="/UpgradeOwner" element={<UpgradeOwner/>}/>
          </Routes>
        </Router>


)



};

export default App;