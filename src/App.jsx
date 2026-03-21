import React, {useState} from "react";
import Login from "./components/Login"
import Register from "./components/Register";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <Login toggleScreen={() => setShowLogin(false)} />
      ) : (
        <Register toggleScreen={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
