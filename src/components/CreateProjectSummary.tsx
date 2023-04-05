import { Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useRouter } from "next/router";

import { Project } from "@/types/project";
import { post } from "@/helpers/fetch";
import { v4 } from "uuid";

type CreateProjectSummaryProps = {
  project: Project;
};

const CreateProjectSummary = ({ project }: CreateProjectSummaryProps) => {
  const { name, participants, swimlanes } = project;
  const router = useRouter();

  const generateProject = async () => {
    const newProject = project;
    newProject.id = v4();
    const parsedProject = JSON.stringify(newProject);

    await post("/api/project", parsedProject);

    router.push(`/project/${newProject.id}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} pt={6} pb={6}>
        <Typography variant="h2" component="h1" textAlign="center">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ minWidth: 275, height: "100%" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              textAlign="center"
              gutterBottom
            >
              Swimlanes
            </Typography>
            {swimlanes.map(column => {
              return (
                <Typography key={column} variant="body2" gutterBottom>
                  {column}
                </Typography>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ minWidth: 275, height: "100%" }}>
          <CardContent>
            <Typography
              variant="h6"
              component="h2"
              textAlign="center"
              gutterBottom
            >
              Participants
            </Typography>
            {participants.map(user => {
              return (
                <Typography key={user.email} variant="body2" gutterBottom>
                  {user.email}
                </Typography>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item container xs={12} mt={12} justifyContent="center">
        <Button variant="contained" onClick={generateProject}>
          Generate!
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateProjectSummary;
