import { useState, FormEvent, Fragment, memo } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type SwimlanesQuestionnaireProps = {
  nextStep: (newData: { [key: string]: string[] }) => void;
};

const SwimlanesQuestionnaire = ({ nextStep }: SwimlanesQuestionnaireProps) => {
  // HOOKS
  const [swimlanes, setSwimlanes] = useState<string[]>([]);

  // HELPERS
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      columnName: { value },
    } = e.target as typeof e.target & {
      columnName: HTMLFormElement;
    };

    if (swimlanes.some(lane => value === lane)) {
      return;
    }

    const newSwimlanes = [...swimlanes];
    newSwimlanes.push(value);
    setSwimlanes(newSwimlanes);
    (e.target as HTMLFormElement).reset();
  };

  const removeToList = (columnName: string) => {
    const newSwimlanes = swimlanes.filter(lane => lane !== columnName);

    setSwimlanes(newSwimlanes);
  };

  const nextStepHandler = () => {
    nextStep({ swimlanes });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" pt={16}>
      <Grid item xs={12}>
        <Typography variant="h2" component="h1" textAlign="center">
          Set up the Swim Lanes!
        </Typography>
      </Grid>
      <Grid item md={6} pt={16}>
        <Box component="form" onSubmit={onSubmitHandler}>
          <TextField
            sx={{ transform: "scale(1.5)" }}
            size="medium"
            fullWidth
            id="standard-basic"
            label="Add Column"
            name="columnName"
            variant="standard"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} pt={16}>
        <Typography variant="h6" component="h3">
          Columns
        </Typography>
        <List>
          {swimlanes.map(column => {
            return (
              <Fragment key={column}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeToList(column)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={column} />
                </ListItem>
                <Divider variant="middle" component="li" />
              </Fragment>
            );
          })}
        </List>
      </Grid>
      <Grid item md={8} pt={16} display="flex" justifyContent="center">
        <Button variant="contained" onClick={nextStepHandler}>
          On to the next!
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(SwimlanesQuestionnaire);
