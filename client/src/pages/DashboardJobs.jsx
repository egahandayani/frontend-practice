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

  // Fetch All Jobs
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
    <div>
      <div>
        <h1>List bf Jobs</h1>
        <button className="btn btn-accent">Add New Job</button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Title Job</th>
                <th>Type</th>
                <th>Posted By</th>
                <th>Phone Number</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody id="table-jobs">
              {jobs.map((el, index) => (
                <tr key={el.id}>
                  <th>{index + 1}</th>
                  <td>{el.title}</td>
                  <td>{el.jobType}</td>
                  <td>{el.User.email}</td>
                  <td>{el.User.phoneNumber}</td>
                  <td>{formatDatetoUS(el.createdAt)}</td>
                  <td>
                    <button> Delete </button>
                  </td>
                  <td>
                    <button> Edit </button>
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
