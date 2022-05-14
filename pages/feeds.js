import { Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Layout from "../components/layout/Layout";
const Feeds = () => {
  return (
    <>
      <Head>
        <title>Feeds | Open AI - Shopify Challenge</title>
      </Head>
      <Layout>
        <Heading>Feeds</Heading>
      </Layout>
    </>
  );
};

export default Feeds;
