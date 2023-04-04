import { useState, useMemo, useCallback } from "react";
import { getSession } from "next-auth/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectQuestionnaire from "@/components/ProjectQuestionnaire";
import SwimlanesQuestionnaire from "@/components/SwimlanesQuestionnaire";
import ParticipantsQuestionnaire from "@/components/ParticipantsQuestionnaire";
import { GetServerSideProps } from "next";
import { Project } from "@/types/project";
import { User } from "@/types/user";

const INITIAL_DATA = {
  name: "",
  swimlanes: new Map(),
  participants: [],
  tickets: [],
};

const CreateProjectPage = () => {
  // HOOKS
  const [step, setStep] = useState(0);
  const [projectDetails, setProjectDetails] = useState<Project>(INITIAL_DATA);

  const updateProjectDetails = useCallback(
    (newData: { [key: string]: string | Map<string, string> | User[] }) => {
      const newProjectDetails = { ...projectDetails, ...newData };

      setProjectDetails(newProjectDetails);
      setStep(step + 1);
    },
    [projectDetails]
  );

  // VIEW HANDLER
  const renderedQuestion = useMemo(() => {
    switch (step) {
      case 1:
        return <SwimlanesQuestionnaire nextStep={updateProjectDetails} />;
      case 2:
        return <ParticipantsQuestionnaire nextStep={updateProjectDetails} />;
      default:
        return <ProjectQuestionnaire nextStep={updateProjectDetails} />;
    }
  }, [step, updateProjectDetails]);

  return <DashboardLayout>{renderedQuestion}</DashboardLayout>;
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
