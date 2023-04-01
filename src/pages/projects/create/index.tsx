import { useState, useMemo, useCallback } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProjectQuestionnaire from "@/components/ProjectQuestionnaire";
import SwimlanesQuestionnaire from "@/components/SwimlanesQuestionnaire";

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
        return <h1>HI</h1>;
      default:
        return <ProjectQuestionnaire nextStep={nextStep} />;
    }
  }, [step, nextStep]);

  return <DashboardLayout>{renderedQuestion}</DashboardLayout>;
};

export default CreateProjectPage;
