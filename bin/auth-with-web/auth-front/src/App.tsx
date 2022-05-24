import { useEffect, useState } from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const instance = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await instance
        .get("/api/user")
        .then((resp) => {
          setName(resp.data.name)
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  });

  return (
    <div className="App">
      <Nav name={name} setName={setName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setName={setName} />} />
      </Routes>
    </div>
  );
}

export default App;
