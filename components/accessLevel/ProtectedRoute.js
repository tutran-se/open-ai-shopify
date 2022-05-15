import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";
import PageLoader from "../loader/PageLoader";
import Logo from "../logo/Logo";

const ProtectedRoute = ({ children }) => {
  const loading = true;
  return <div>{loading ? <PageLoader /> : <>{children}</>}</div>;
};

export default ProtectedRoute;
