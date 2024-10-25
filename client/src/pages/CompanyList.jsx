import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import practiceApi from "../helpers/http-client";

export default function CompanyList() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">
            List of Companies
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Logo Company</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Location</th>
                <th className="py-3 px-6 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="text-black text-sm font-light">
              {companies.map((el, index) => (
                <tr
                  key={el.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left"> <img src={el.companyLogo}/></td>
                  <td className="py-3 px-6 text-left">{el.name}</td>
                  <td className="py-3 px-6 text-left">{el.location}</td>
                  <td className="py-3 px-6 text-left">{el.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
