import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./context/authContext"; 
import AccessContainer from "./components/Access/AccessContainer";
import Login from "./components/Access/Login";
import Register from "./components/Access/Register";
import UpgradeOwner from "./components/Access/UpgradeOwner";
import OwnerContainer from "./components/Access/OwnerContainer";
import HomeContainer from "./components/Home/HomeContainer";
import CreateAccommodation from "./components/OptionsOwner/CreateAccommodation";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<HomeContainer/>}/>
          <Route path="/AccessContainer" element={<AccessContainer/>}/>
          <Route path="/OwnerContainer" element={<OwnerContainer/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/UpgradeOwner" element={<UpgradeOwner/>}/>
          <Route path="/CreateAccommodation" element={<CreateAccommodation/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;