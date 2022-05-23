
export const Nav = () => {

  return (
    <div className="navbar bg-slate-800">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-white">Home</a>
      </div>
      <div className="flex-none">
        <a className="btn btn-ghost normal-case text-xl text-white">Login</a>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl text-white">Logout</a>
        </div>
      </div>
    </div>
  )
}
