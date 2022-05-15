import Head from "next/head";
import React from "react";
import Home from "../components/home/Home";
import PublicRoute from "../components/accessLevel/PublicRoute";
const HomePage = () => {
  return (
    <>
      <Head>
        <title>Open AI - Shopify Challenge</title>
      </Head>
      <PublicRoute>
        <Home />
      </PublicRoute>
    </>
  );
};

export default HomePage;
