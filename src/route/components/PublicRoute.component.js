import React from "react";
import { Route } from "react-router-dom";
import MainLayout from "../../layout/Main.layout";

const PublicRoute = ({ component: Component, ...props }) => {
  const layout = props.layout !== undefined ? props.layout : true;

  return (
    <Route render={(props) => (
      layout ? <MainLayout><Component {...props} /></MainLayout>
        : <Component {...props} />
      )} {...props}
    />
  );
};

export default PublicRoute;
