"use client"
import React from "react";
import JobForm from "../Jobs/JobsForm"; 
import dynamic from "next/dynamic";

const JobList = dynamic(() => import("@/components/Jobs/JobList"), {
  ssr: false,
});
const HomePage = () => {
  return (
    <div>
      <JobForm />
      <JobList />
    </div>
  );
};

export default HomePage;
