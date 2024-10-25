import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import practiceApi from "../helpers/http-client";

export default function DashboardJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const formatDatetoUS = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  const fetchJobs = async () => {
    try {
      const { data } = await practiceApi.get("/apis/career-portal/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setJobs(data.data);
    } catch (err) {
      console.log("🚀 ~ fetchJobs ~ err:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error || "Something went wrong! ",
      });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">List of Jobs</h1>
          <button 
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={() => navigate("/add-new-job")}
          >
            Add New Job
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Title Job</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Posted By</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-black text-sm font-light">
              {jobs.map((el, index) => (
                <tr key={el.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{el.title}</td>
                  <td className="py-3 px-6 text-left">{el.jobType}</td>
                  <td className="py-3 px-6 text-left">{el.User.email}</td>
                  <td className="py-3 px-6 text-left">{el.User.phoneNumber}</td>
                  <td className="py-3 px-6 text-left">{formatDatetoUS(el.createdAt)}</td>
                  <td className="py-3 px-6 text-left flex space-x-2">
                    <button 
                      className="bg-red-500 text-white py-1 px-3 rounded-lg shadow hover:bg-red-600 transition duration-300"
                      onClick={() => {/* handle delete */}}
                    >
                      Delete
                    </button>
                    <button 
                      className="bg-yellow-500 text-white py-1 px-3 rounded-lg shadow hover:bg-yellow-600 transition duration-300"
                      onClick={() => {/* handle edit */}}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
