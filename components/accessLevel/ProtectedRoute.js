import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";
import PageLoader from "../loader/PageLoader";

const ProtectedRoute = ({ children }) => {
  const { isAuthStateReady, isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (isAuthStateReady && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthStateReady, isAuthenticated, router]);
  return (
    <div>
      {!isAuthStateReady ? <PageLoader /> : <>{isAuthenticated && children}</>}
    </div>
  );
};

export default ProtectedRoute;
