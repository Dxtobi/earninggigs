import React from 'react';
import {  Navigate, } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ auth, children }) => {
  if (!auth) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth.auth
})

export default connect( mapStateToProps )( PrivateRoute )
