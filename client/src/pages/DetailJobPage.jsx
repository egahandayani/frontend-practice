import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import practiceApi from "../helpers/http-client";
import Preloader from "../components/Preloader";

export default function DetailJobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  // Fetch Data Job By Id
  const fetchJobById = async () => {
    try {
      setIsLoading(true);
      const { data } = await practiceApi.get(
        `/apis/pub/career-portal/jobs/${id}`
      );
      setJob(data.data);
    } catch (err) {
      console.log("🚀 ~ fetchJobById ~ err:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.error || "Something went wrong! ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchJobById();
  }, [id]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!job) {
    return <div>Job ${id} Not Found...</div>;
  }

  return (
    <div className="flex justify-center my-8 px-4">
      <div className="bg-gray-800 bg-opacity-90 max-w-3xl w-full p-6 rounded-lg shadow-lg">
        {/* Job Image */}
        <div className="relative">
          <img
            src={job.imgUrl}
            alt={job.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-md">
            {job.jobType}
          </div>
        </div>
  
        {/* Job Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-100">{job.title}</h1>
          <div className="flex items-center mt-3 space-x-4">
            <p className="text-gray-300">
              <strong>Location: </strong> {job.Company.location}
            </p>
            <p className="text-gray-300">
              <strong>Email: </strong> {job.Company.email}
            </p>
          </div>
  
          <div className="my-4">
            <h3 className="text-xl font-semibold text-gray-200">Job Description</h3>
            <p className="text-gray-400 mt-2">{job.description}</p>
          </div>
  
          {/* Company Information */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-100">About the Company</h3>
            <p className="text-gray-400 mt-2">
              <strong>Company: </strong> {job.Company.name}
            </p>
            <p className="text-gray-400 mt-2">
              <strong>Location: </strong> {job.Company.location}
            </p>
            <p className="text-gray-400 mt-2">
              <strong>Contact: </strong> {job.Company.email}
            </p>
            <p className="text-gray-400 mt-2">
              <strong>Posted by: </strong> {job.User.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}
