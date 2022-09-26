import { Link, useNavigate } from "react-router-dom";
import { clearAuth } from "../api/Auth";

export const Nav = (
  props: { name: string; setName: (name: string) => void },
) => {
  let navigate = useNavigate();
  let menu;
  if (props.name === "") {
    menu = <Link to="/login" className="text-xl text-white">Login</Link>;
  } else {
    menu = (
      <div
        className="text-xl text-white"
        onClick={() => {
          clearAuth().then(() => {
            props.setName("");
            navigate("/login");
          });
        }}
      >
        Logout
      </div>
    );
  }

  return (
    <div className="flex bg-slate-700 py-2 px-4">
      <div className="flex-1">
        <Link to="/" className="text-xl text-white">AsRock</Link>
      </div>
      <div className="flex-none">{menu}</div>
    </div>
  );
};

export default Nav;
