import React from "react";
import Directory from "../../components/Directory/Directory";

import "./homepage.styles.scss";

import { HomePageComponent } from "./homepage.styles";

const Homepage = () => {
  return (
    <HomePageComponent>
      <Directory />
    </HomePageComponent>
  );
};

export default Homepage;
