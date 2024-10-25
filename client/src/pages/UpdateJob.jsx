import { useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import practiceApi from "../helpers/http-client";

export default function UpdateJob() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data Job By Id
  const fetchJobById = async () => {
    try {
      setIsLoading(true);
      const { data } = await practiceApi.get(`/apis/career-portal/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
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
    return <div>Job with ID {id} Not Found...</div>;
  }

  return (
    <div>
      <JobForm data={job} formType="update" />
    </div>
  );
}
