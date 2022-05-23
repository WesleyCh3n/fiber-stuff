import { Link, useNavigate } from "react-router-dom";

export const Nav = (props: { name: string, setName: (name: string) => void }) => {
  let navigate = useNavigate();
  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    });
    props.setName('');
    navigate("/login");
  }

  let menu;
  if (props.name === '') {
    menu = (
      <Link
        to="/login"
        className="btn btn-ghost normal-case text-xl text-white"
      >
        Login
      </Link>
    )
  } else {
    menu = (
      <div
        className="btn btn-ghost normal-case text-xl text-white"
        onClick={logout}
      >
        Logout
      </div>
    )
  }
  return (
    <div className="navbar bg-slate-800">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
          AsRock
        </Link>
      </div>
      <div className="flex-none">
        {menu}
      </div>
    </div>
  );
};
