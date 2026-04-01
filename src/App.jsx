import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./context/authContext"; 
import AccessContainer from "./components/Access/AccessContainer";
import Login from "./components/Access/Login";
import Register from "./components/Access/Register";
import UpgradeOwner from "./components/Access/UpgradeOwner";
import OwnerContainer from "./components/Access/OwnerContainer";
import HomeContainer from "./components/Home/HomeContainer";
import CreateAccommodation from "./components/Form/AccommodationForm/CreateAccommodation";
import MyAccommodations from "./components/Owner/Management/MyAccommodations";
import EditDraft from "./components/Form/CompletedDraft/editDraft";
import ModifiedAccommodation from "./components/Form/FormModifiedAccommodation/ModifiedAccommodation";
import AddRoom from "./components/Form/FormAddRoom/AddRoom";
import MyRooms from "./components/Owner/Management/MyRooms";
import Search from "./components/Search/Search";
import ModifiedRoom from "./components/Form/FormModifiedRoom/ModifiedRoom";
import SearchAdvanced from "./components/Search/SearchAdvanced";
import SearchAdvancedRoom from "./components/Search/SearchAdvancedRooms";

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
          <Route path="/Mis-Alojamientos" element={<MyAccommodations/>}/>
          <Route path="/Edit-Draft/:uuid" element={<EditDraft/>}/>
          <Route path="/Modified-Accommodation/:uuid" element={<ModifiedAccommodation/>}/>
          <Route path="/Add-Room/:uuid" element={<AddRoom/>}/>
          <Route path="/Mis-Habitaciones" element={<MyRooms/>}/>
          <Route path="/Reservar" element={<Search/>}/>
          <Route path="/Modificar-Habitacion/:uuid" element={<ModifiedRoom/>}/>
          <Route path="/Busqueda-Alojamientos" element={<SearchAdvanced/>}/>
          <Route path="/Busqueda-Habitaciones/:uuid" element={<SearchAdvancedRoom/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;