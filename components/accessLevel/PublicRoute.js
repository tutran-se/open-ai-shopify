import React from "react";
import PageLoader from "../loader/PageLoader";

const PublicRoute = ({ children }) => {
  const loading = true;
  return <div>{loading ? <PageLoader /> : <>{children}</>}</div>;
};

export default PublicRoute;
