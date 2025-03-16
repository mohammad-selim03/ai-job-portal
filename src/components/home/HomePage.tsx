import React from "react";
import Banner from "./Banner";
import Container from "../dynamics/Container";
import Connect from "./Connect";

const HomePage = () => {
  return (
    <div>
      <Container>
        <Banner />
      </Container>
      <Connect />
    </div>
  );
};

export default HomePage;
