import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { isLoggedIn } = props;
  return (
    <Route exact render={(props) => (
      !isLoggedIn ? <Component {...props} /> : (<Redirect to={'/'}/>)
      )} {...props} />
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
};

export default connect(mapStateToProps)(ProtectedRoute);
