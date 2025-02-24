"use client";

import { useState } from "react";

export default function JobForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    category: "",
    skills: "",
    salary: "",
    jobType: "Full-Time",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      }),
    });

    if (response.ok) {
      alert("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        category: "",
        skills: "",
        salary: "",
        jobType: "Full-Time",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto space-y-4">
      <input name="title" placeholder="Job Title" onChange={handleChange} value={formData.title} className="border p-2 w-full" required />
      <input name="company" placeholder="Company" onChange={handleChange} value={formData.company} className="border p-2 w-full" required />
      <input name="location" placeholder="Location" onChange={handleChange} value={formData.location} className="border p-2 w-full" required />
      <textarea name="description" placeholder="Job Description" onChange={handleChange} value={formData.description} className="border p-2 w-full" required />
      <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} className="border p-2 w-full" required />
      <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} value={formData.skills} className="border p-2 w-full" required />
      <input name="salary" placeholder="Salary" onChange={handleChange} value={formData.salary} className="border p-2 w-full" required />
      <select name="jobType" onChange={handleChange} value={formData.jobType} className="border p-2 w-full">
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Remote">Remote</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Post Job</button>
    </form>
  );
}
