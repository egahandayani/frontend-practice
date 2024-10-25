import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { isLogin, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-gray-700">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isLogin && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Category List</a>
              </li>
              <li>
                <a>Add User</a>
              </li>
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">CariKerja</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {isLogin && (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Category List</a>
            </li>
            <li>
              <a>Add User</a>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar-end">
        {isLogin ? (
          <button className="btn btn-error" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-success">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
