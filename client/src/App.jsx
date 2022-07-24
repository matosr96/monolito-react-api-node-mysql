import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Compromiso from "./screens/Compromiso";
import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/compromisos" element={<Compromiso />} />
    </Routes>
  );
}

export default App;
