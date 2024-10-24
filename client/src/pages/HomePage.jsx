import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import practiceApi from "../helpers/http-client";
import Swal from "sweetalert2";
import Preloader from "../components/Preloader";

export default function HomePage() {
  // State for handling pagination, filter, search and sort
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("ASC");
  const [page, setPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState("");

  // Declare state for job and categories

  const [jobs, setJobs] = useState({
    query: [],
    pagination: {
      currentPage: 1,
      totalPage: 1,
      totalRows: 1,
    },
  });

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Fetch Data Jobs
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const { data } = await practiceApi.get("/apis/pub/career-portal/jobs", {
        params: {
          q: debouncedSearch || undefined,
          i: selectedCompanies || undefined,
          page,
          limit: 10,
          sort,
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
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Data Companies
  const fetchCompanies = async () => {
    try {
      const { data } = await practiceApi.get(
        "/apis/pub/career-portal/companies"
      );
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

  // Fetch Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch Companies
  useEffect(() => {
    void fetchCompanies();
  }, []);

  // Fetch Jobs
  useEffect(() => {
    void fetchJobs();
  }, [debouncedSearch, sort, page, selectedCompanies]);

  // Function to Pagination Siblings
  const getPageNumbers = () => {
    const totalPages = jobs.pagination.totalPage;
    const siblings = 2;
    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, i) => i + start);

    if (totalPages <= 5) {
      return range(1, totalPages);
    }

    if (page <= siblings + 1) {
      return range(1, siblings + 3).concat(["...", totalPages]);
    }

    if (page >= totalPages - siblings) {
      return [1, "..."].concat(range(totalPages - siblings - 2, totalPages));
    }

    return [1, "..."].concat(range(page - siblings, page + siblings), [
      "...",
      totalPages,
    ]);
  };

  const handlePageChange = (newPage) => {
    if (
      newPage !== "..." &&
      newPage >= 1 &&
      newPage <= jobs.pagination.totalPage
    ) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!jobs.query.length) {
    return <div>Jobs Not Found...</div>;
  }

  return (
    <div>
      {/* Container for Search, Filter, Sort */}
      <div className="container mt-4">
        {/* Search, Filter and Sort*/}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          <div className="w-full md:w-auto">
            <input
              type="search"
              id="search"
              placeholder="Search here..."
              className="input input-bordered input-accent w-48"
              value={search}
              onChange={(el) => setSearch(el.target.value)}
            />
          </div>
          <div className="w-full md:w-auto">
            <select
              className="select select-accent w-48"
              id="filter"
              value={selectedCompanies}
              onChange={(el) => setSelectedCompanies(el.target.value)}
            >
              <option disabled selected>
                Filter by Job Type
              </option>
              {companies.map((company) => (
                <option key={company.id} value={company.value}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-auto">
            <select
              className="select select-accent w-48"
              id="sort"
              value={sort}
              onChange={(el) => setSort(el.target.value)}
            >
              <option value="desc">Sort by Latest</option>
              <option value="asc">Sort by Oldest</option>
            </select>
          </div>
        </div>
        {/* End Container for Search, Filter, Sort */}
      </div>

      {/* Card Display */}
      <div
        id="cards"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
      >
        {jobs.query.map((job) => {
          return (
            <JobCard
              key={job.id}
              job={{
                id: job.id,
                imgUrl: job.imgUrl,
                title: job.title,
                jobType: job.jobType,
                location: job.Company.location,
              }}
            />
          );
        })}
      </div>

      {/* Pagination */}
      <div className="join mt-8 justify-center flex mb-6">
        <button
          className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        {getPageNumbers().map((number, i) => (
          <button
            key={i}
            className={`join-item btn ${number === page ? "btn-active" : ""} ${
              number === "..." ? "btn-disabled" : ""
            }`}
            onClick={() => handlePageChange(number)}
            disabled={number === "..."}
          >
            {number}
          </button>
        ))}
        <button
          className={`join-item btn ${
            page === jobs.pagination.totalPage ? "btn-disabled" : ""
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === jobs.pagination.totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
