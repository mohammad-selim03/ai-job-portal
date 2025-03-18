import React from "react";
import Banner from "./Banner";
import Container from "../dynamics/Container";
import Connect from "./Connect";
import JobsSearch from "./jobs/JobsSearch";
import SearchCompanies from "./bestWorkplaces/SearchCompanies";
import Community from "./Community/Community";

const HomePage = () => {
  return (
    <div>
      <Container>
        <Banner />
      </Container>
      <Connect />
      <JobsSearch />
      <Container>
        <SearchCompanies />
        <Community />
      </Container>
    </div>
  );
};

export default HomePage;
