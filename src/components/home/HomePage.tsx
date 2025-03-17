import React from "react";
import Banner from "./Banner";
import Container from "../dynamics/Container";
import Connect from "./Connect";
import JobsSearch from "./JobsSearch";

const HomePage = () => {
  return (
    <div>
      <Container>
        <Banner />
      </Container>
      <Connect />
      <JobsSearch />
    </div>
  );
};

export default HomePage;
