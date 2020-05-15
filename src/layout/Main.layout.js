import React from "react";
import { Header, Footer } from "../components";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
