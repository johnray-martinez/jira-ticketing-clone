import { useState, FormEvent, Fragment } from "react";
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
  nextStep: () => void;
};

const SwimlanesQuestionnaire = ({ nextStep }: SwimlanesQuestionnaireProps) => {
  // HOOKS
  const [columnsMap, setColumnsMap] = useState(new Map());

  // HELPERS
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      columnName: { value },
    } = e.target as typeof e.target & {
      columnName: HTMLFormElement;
    };

    if (columnsMap.has(value)) {
      return;
    }

    const newColumnsMap = new Map(columnsMap);
    newColumnsMap.set(value, newColumnsMap.size);
    setColumnsMap(newColumnsMap);
    (e.target as HTMLFormElement).reset();
  };

  const removeToList = (columnName: string) => {
    const newColumnsMap = new Map(columnsMap);

    newColumnsMap.delete(columnName);
    setColumnsMap(newColumnsMap);
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
          {Array.from(columnsMap).map(([column, id]) => {
            return (
              <Fragment key={id}>
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
        <Button variant="contained" onClick={nextStep}>
          This sounds good!
        </Button>
      </Grid>
    </Grid>
  );
};

export default SwimlanesQuestionnaire;
