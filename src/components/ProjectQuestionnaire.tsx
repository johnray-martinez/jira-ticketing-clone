import { memo, useState, ChangeEvent } from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";

type ProjectQuestionnaireProps = {
  nextStep: (newData: { [key: string]: string }) => void;
};

const ProjectQuestionnaire = ({ nextStep }: ProjectQuestionnaireProps) => {
  const [name, setName] = useState("");

  const nextStepHandler = () => {
    nextStep({ name });
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" pt={16}>
      <Grid item md={8}>
        <Typography variant="h2" component="h1" textAlign="center">
          Let us get you started!
        </Typography>
      </Grid>
      <Grid item md={6} pt={16}>
        <TextField
          sx={{ transform: "scale(1.5)" }}
          size="medium"
          fullWidth
          id="standard-basic"
          label="Project Name"
          variant="standard"
          onChange={onChangeHandler}
        />
      </Grid>
      <Grid item md={8} pt={16} display="flex" justifyContent="center">
        <Button variant="contained" onClick={nextStepHandler}>
          This sounds good!
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(ProjectQuestionnaire);
