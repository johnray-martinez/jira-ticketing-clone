import { Grid, TextField, Typography, Button } from "@mui/material";

type ProjectQuestionnaireProps = {
  nextStep: () => void;
};

const ProjectQuestionnaire = ({ nextStep }: ProjectQuestionnaireProps) => {
  return (
    <Grid container justifyContent="center" alignItems="center" pt={32}>
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
        />
      </Grid>
      <Grid item md={8} pt={16} display="flex" justifyContent="center">
        <Button variant="contained" onClick={nextStep}>
          This sounds good!
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectQuestionnaire;
