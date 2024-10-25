import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import practiceApi from "../helpers/http-client";
import Swal from "sweetalert2";

export default function JobForm({ data, formType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    jobType: "",
    imgUrl: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);

  // Populate Form Data For Edit
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        description: data.description || "",
        jobType: data.jobType || "",
        imgUrl: data.imgUrl || "",
        companyId: data.companyId || "",
      });
    }
  }, [data]);

  // Fetch Data Companies
  const fetchCompanies = async () => {
    try {
      const { data } = await practiceApi.get("/apis/career-portal/companies", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setCompanies(data.data);
    } catch (err) {
      console.log("🚀 ~ fetchCompanies ~ err:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error || "Something went wrong! ",
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handle Form Input
  const handleChange = (el) => {
    const { id, value } = el.target;

    // String to Number
    setFormData({
      ...formData,
      [id]: id === "companyId" ? parseInt(value, 10) : value,
    });
  };

  // Handle Form Submit
  const handleCreateJob = async (el) => {
    el.preventDefault();
    try {
      if (formType === "create") {
        await practiceApi.post("/apis/career-portal/jobs", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Job created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/jobs");
      } else if (formType === "update") {
        await practiceApi.put(`/apis/career-portal/jobs/${data.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Job updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/jobs");
      }
    } catch (err) {
      console.log("🚀 ~ handleCreateJob ~ err:", err);
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
          Create New Job
        </h1>
        <form className="space-y-4" onSubmit={handleCreateJob}>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                id="title"
                className="grow"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                id="description"
                className="grow"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                id="jobType"
                className="grow"
                placeholder="Job Type"
                value={formData.jobType}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                id="imgUrl"
                className="grow"
                placeholder="Job Image Url"
                value={formData.imgUrl}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="flex items-center gap-2">
              <select
                className="input input-bordered w-full bg-gray-850 text-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent hover:bg-gray-800 transition ease-in-out duration-150"
                id="companyId"
                value={formData.companyId || ""}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Company
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-accent w-full py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-accent-focus hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-focus"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
