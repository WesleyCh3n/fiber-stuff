import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { isAuth } from "./api/Auth";

import { Nav } from "./components";
import { Home, Login, PageNotFound } from "./pages";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      let result = await isAuth();
      if (result.data) {
        setName(result.data.name);
      }
    })();
  });

  return (
    <div>
      <Nav name={name} setName={setName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login setName={setName} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
