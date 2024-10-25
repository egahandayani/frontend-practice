import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import practiceApi from "../helpers/http-client";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (el) => {
    el.preventDefault();

    try {
      const { data } = await practiceApi.post("/apis/login", {
        email,
        password,
      });

      login(data.data.access_token);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have successfully logged in!",
      });

      navigate("/jobs");
    } catch (err) {
      console.log("🚀 ~ handleLogin ~ err:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error || "Something went wrong! ",
      });
    }
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden bg-base-100 mt-20">
      <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-300">
        <h1 className="text-3xl font-semibold text-center text-accent mb-5">
          Login
        </h1>
        <form id="login-form" className="space-y-4" onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                id="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(el) => setEmail(el.target.value)}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                id="password"
                name="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(el) => setPassword(el.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-accent w-full py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-accent-focus hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-focus"
          >
            Log In
          </button>
        </form>
        <div className="divider divider-accent mt-7">OR</div>
        <p className="text-center">
          {" "}
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="underline">
            {" "}
            Register{" "}
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}
