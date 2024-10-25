import { useState } from "react";
import { Link, useActionData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import practiceApi from "../helpers/http-client";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async (el) => {
    el.preventDefault();

    try {
      const { data } = await practiceApi.post(
        "/apis/add-user",
        {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/jobs");
    } catch (err) {
      navigate("/add-user");
      console.log("🚀 ~ handleRegister ~ err:", err);
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
          Create New User
        </h1>
        <form className="space-y-4" onSubmit={handleRegister}>
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
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                id="username"
                className="grow"
                placeholder="Username"
                value={username}
                onChange={(el) => setUsername(el.target.value)}
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
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(el) => setPassword(el.target.value)}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 opacity-70" 
              >
                <path d="M21 15.46l-5.27-.61a1 1 0 00-.9.29l-2.2 2.2a15.65 15.65 0 01-6.57-6.57l2.2-2.2a1 1 0 00.29-.9L8.54 3a1 1 0 00-1-.8H5a1 1 0 00-1 1A16 16 0 0020 20a1 1 0 001-1v-2.54a1 1 0 00-.8-.99z" />
              </svg>
              <input
                type="text"
                id="phoneNumber"
                className="grow"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(el) => setPhoneNumber(el.target.value)}
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
                <path d="M8 0a5 5 0 0 1 5 5c0 3.224-4.086 8.157-4.506 8.696a.506.506 0 0 1-.988 0C7.086 13.157 3 8.224 3 5a5 5 0 0 1 5-5Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
              <input
                type="text"
                id="address"
                className="grow"
                placeholder="Address"
                value={address}
                onChange={(el) => setAddress(el.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-accent w-full py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-accent-focus hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-focus"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
