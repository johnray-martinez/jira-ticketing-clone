import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const DashboardPage = () => {
  return <div />;
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
