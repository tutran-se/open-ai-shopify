import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import ProtectedRoute from "../components/accessLevel/ProtectedRoute";
import Feeds from "../components/feeds/Feeds";
import Layout from "../components/layout/Layout";
const FeedsPage = () => {
  return (
    <>
      <Head>
        <title>Feeds | Open AI - Shopify Challenge</title>
      </Head>
      <ProtectedRoute>
        <Layout>
          <Feeds />
        </Layout>
      </ProtectedRoute>
    </>
  );
};

export default FeedsPage;
