"use client";

import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Job Listings</h2>
      {jobs.length === 0 ? <p>No jobs available</p> : jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-4">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.company} - {job.location}</p>
          <p>{job.description}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
        </div>
      ))}
    </div>
  );
}
