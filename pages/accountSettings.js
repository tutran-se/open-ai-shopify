import Head from "next/head";
import React from "react";
import AccountSettings from "../components/accountSettings/AccountSettings";
import Layout from "../components/layout/Layout";

const AccountSettingsPage = () => {
  return (
    <>
      <Head>
        <title>Account Settings | Open API - Shopify Challenge</title>
      </Head>
      <Layout>
        <AccountSettings />
      </Layout>
    </>
  );
};

export default AccountSettingsPage;
