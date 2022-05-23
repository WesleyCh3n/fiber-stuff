import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    const response = await fetch("http://localhost:8000/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({
        email,
        password
      })
    });

    const content = await response.json();

    props.setName(content.name)
    navigate("/", {replace: true})
  }

  return (
    <div className="flex justify-center p-4">
      <div className="w-80">
        <div className="text-2xl py-5">Please Sign in</div>
        <form onSubmit={submit}>
          <div className="mb-6">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
