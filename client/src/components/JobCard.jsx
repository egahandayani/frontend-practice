import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="card bg-gray-800 bg-opacity-80 max-w-xs w-full shadow-lg border border-gray-700 text-white">
      <figure className="h-48 overflow-hidden">
        <img
          src={job.imgUrl}
          alt={job.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body flex flex-col justify-between">
        <h2 className="card-title text-lg font-semibold truncate">
          {job.title}
        </h2>
        <div className="badge badge-secondary bg-green-500 text-white">
          {job.jobType}
        </div>
        <p className="text-sm truncate">{job.location}</p>
        <div className="card-actions justify-end mt-4">
          <Link to={`/jobs/${job.id}`} className="btn btn-primary">Detail Job</Link>
        </div>
      </div>
    </div>
  );
}
