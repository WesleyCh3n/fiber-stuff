import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [name, setName] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const instance = axios.create({
        baseURL: "http://localhost:8000",
        withCredentials: true,
      });
      await instance
        .get("/api/user")
        .then((resp) => {
          setName(resp.data.name);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    })();
  }, []);

  return <div className="p-3 text-xl">{name ? "Hi " + name : ""}</div>;
};
