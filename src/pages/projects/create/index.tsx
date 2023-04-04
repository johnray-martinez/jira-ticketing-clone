import { useState, useMemo, useCallback } from "react";
import { getSession } from "next-auth/react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectQuestionnaire from "@/components/ProjectQuestionnaire";
import SwimlanesQuestionnaire from "@/components/SwimlanesQuestionnaire";
import ParticipantsQuestionnaire from "@/components/ParticipantsQuestionnaire";
import { GetServerSideProps } from "next";

const CreateProjectPage = () => {
  // HOOKS
  const [step, setStep] = useState(0);

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const renderedQuestion = useMemo(() => {
    switch (step) {
      case 1:
        return <SwimlanesQuestionnaire nextStep={nextStep} />;
      case 2:
        return <ParticipantsQuestionnaire nextStep={nextStep} />;
      default:
        return <ProjectQuestionnaire nextStep={nextStep} />;
    }
  }, [step, nextStep]);

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
