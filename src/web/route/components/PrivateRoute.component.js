import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import MainLayout from "@/web/layout/Main.layout";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { isLoggedIn } = props;
  const layout = props.layout !== undefined ? props.layout : true;

  return (
    <Route exact render={(props) => (
      isLoggedIn ?
          (layout ? <MainLayout><Component {...props} /></MainLayout> : <Component {...props} />)
          : (<Redirect to={{pathname: '/'}}/>)
      )} {...props} />
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
};

export default connect(mapStateToProps)(PrivateRoute);
