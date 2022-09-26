import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../api/Auth";

export const Login = (props: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let result = await setAuth(email, password);
    if (result.data) {
      props.setName(result.data.name);
      navigate("/", { replace: true });
    } else {
      setErrorMsg(result.error.response.statusText);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-1/4 min-w-[300px]">
        <div className="text-2xl py-5">Please Sign in</div>
        <form className="space-y-6" onSubmit={submit}>
          <input
            type="text"
            autoFocus={true}
            className="w-full py-3 px-3 border border-gray-300
              rounded-lg shadow text-xl text-gray-700 transition ease-in-out
              focus:border-blue-600 focus:outline-none"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full py-3 px-3 border border-gray-300
              rounded-lg shadow text-xl text-gray-700 transition ease-in-out
              focus:border-blue-600 focus:outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 text-white font-medium text-lg
            uppercase rounded shadow-md hover:bg-cyan-700
            hover:shadow-lg focus:bg-blue-700
            active:bg-cyan-800 transition duration-150
            ease-in-out"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign in
          </button>
        </form>
        <span className="w-full flex m-2 justify-center text-lg text-red-500
          font-bold">
          {errorMsg}
        </span>
      </div>
    </div>
  );
};

export default Login;
