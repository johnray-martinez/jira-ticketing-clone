import { useState } from "react";
import { getSession } from "next-auth/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectQuestionnaire from "@/components/ProjectQuestionnaire";
import SwimlanesQuestionnaire from "@/components/SwimlanesQuestionnaire";
import ParticipantsQuestionnaire from "@/components/ParticipantsQuestionnaire";
import { GetServerSideProps } from "next";
import { Project } from "@/types/project";
import { User } from "@/types/user";
import Head from "next/head";
import CreateProjectSummary from "@/components/CreateProjectSummary";

const INITIAL_DATA = {
  id: "",
  name: "",
  swimlanes: [],
  participants: [],
  tickets: [],
};

const CreateProjectPage = () => {
  // HOOKS
  const [step, setStep] = useState(0);
  const [projectDetails, setProjectDetails] = useState<Project>(INITIAL_DATA);

  const updateProjectDetails = (newData: {
    [key: string]: string | string[] | User[];
  }) => {
    const newProjectDetails = { ...projectDetails, ...newData };

    setProjectDetails(newProjectDetails);
    setStep(step + 1);
  };

  // VIEW HANDLER
  const renderQuestion = () => {
    switch (step) {
      case 0:
        return <ProjectQuestionnaire nextStep={updateProjectDetails} />;
      case 1:
        return <SwimlanesQuestionnaire nextStep={updateProjectDetails} />;
      case 2:
        return <ParticipantsQuestionnaire nextStep={updateProjectDetails} />;
      default:
        return <CreateProjectSummary project={projectDetails} />;
    }
  };

  return (
    <>
      <Head>
        <title>Create a Project | Tix</title>
      </Head>
      <DashboardLayout>{renderQuestion()}</DashboardLayout>;
    </>
  );
};

export default CreateProjectPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
