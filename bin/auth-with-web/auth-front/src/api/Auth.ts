import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export async function isAuth(): Promise<{ data: any; error: any }> {
  const resolved = {
    data: null,
    error: null,
  };
  await instance
    .get("/api/user")
    .then((resp) => {
      resolved.data = resp.data;
    })
    .catch((err) => {
      resolved.error = err;
    });
  return resolved;
}

export async function clearAuth(): Promise<any> {
  return instance.post("/api/logout");
}

export async function setAuth(
  user: string,
  password: string,
): Promise<{ data: any; error: any }> {
  const resolved = {
    data: null,
    error: null,
  };
  await instance.post("/api/login", { email: user, password: password }, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  }).then((resp) => {
    resolved.data = resp.data;
  }).catch((e) => {
    resolved.error = e;
  });
  return resolved;
}
