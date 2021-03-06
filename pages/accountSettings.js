import Head from "next/head";
import React from "react";
import ProtectedRoute from "../components/accessLevel/ProtectedRoute";
import AccountSettings from "../components/accountSettings/AccountSettings";
import Layout from "../components/layout/Layout";

const AccountSettingsPage = () => {
  return (
    <>
      <Head>
        <title>Account Settings | Open API - Shopify Challenge</title>
      </Head>
      <ProtectedRoute>
        <Layout>
          <AccountSettings />
        </Layout>
      </ProtectedRoute>
    </>
  );
};

export default AccountSettingsPage;
