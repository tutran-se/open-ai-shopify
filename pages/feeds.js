import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Feeds from "../components/feeds/Feeds";
import Layout from "../components/layout/Layout";
const FeedsPage = () => {
  return (
    <>
      <Head>
        <title>Feeds | Open AI - Shopify Challenge</title>
      </Head>
      <Layout>
        <Feeds />
      </Layout>
    </>
  );
};

export default FeedsPage;
