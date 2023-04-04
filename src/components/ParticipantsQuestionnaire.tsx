import { useState, Fragment, memo } from "react";
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "@/types/user";
import EmailSearchDropdown from "./EmailSearchDropdown";

type ParticipantsQuestionnaireProps = {
  nextStep: () => void;
};

const ParticipantsQuestionnaire = ({
  nextStep,
}: ParticipantsQuestionnaireProps) => {
  // HOOKS
  const [participants, setParticipants] = useState<User[]>([]);

  const removeParticipant = (id: string) => {
    const newParticipants = participants.filter(
      participant => participant._id !== id
    );
    setParticipants(newParticipants);
  };

  const addToParticipantsList = (user: User) => {
    const isUserAlreadyIncluded = participants.some(
      participant => participant._id === user._id
    );

    if (isUserAlreadyIncluded) {
      return;
    }

    setParticipants([...participants, user]);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" pt={16}>
      <Grid item xs={12}>
        <Typography variant="h2" component="h1" textAlign="center">
          Who&#39;s Attending the Party?
        </Typography>
      </Grid>
      <Grid item md={6} pt={16}>
        <EmailSearchDropdown addParticipant={addToParticipantsList} />
      </Grid>
      <Grid item xs={12} md={8} pt={16}>
        <Typography variant="h6" component="h3">
          Participants
        </Typography>
        <List>
          {participants.map(({ _id, email }) => {
            return (
              <Fragment key={_id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => removeParticipant(_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={email} />
                </ListItem>
                <Divider variant="middle" component="li" />
              </Fragment>
            );
          })}
        </List>
      </Grid>
      <Grid item md={8} pt={16} display="flex" justifyContent="center">
        <Button variant="contained" onClick={nextStep}>
          That&#39;s Everyone!
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(ParticipantsQuestionnaire);
