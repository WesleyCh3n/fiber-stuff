import { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      console.log(response);
      const content = await response.json();


      if (content.name) {
        setName(content.name);
      }
    })();
  });

  return (
    <div className="App">
      <Nav name={name} setName={setName} />
      <Routes>
        <Route path="/" element={<Home name={name} />} />
        <Route path="/login" element={<Login setName={setName} />} />
      </Routes>
    </div>
  );
}

export default App;
