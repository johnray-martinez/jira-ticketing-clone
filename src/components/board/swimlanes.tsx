import { Swimlane } from "@/types/swimlane";

import TicketsComponent from "@/components/board/tickets";
import { PALETTE } from "@/constants/palette";

import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const SwimlaneComponent = ({ status, tickets }: Swimlane) => {
  return (
    <Grid item>
      <Card
        sx={{ m: "2px", height: "100%", backgroundColor: PALETTE.lightBlue }}
      >
        <CardHeader
          title={status.name}
          sx={{ fontSize: 12, fontWeight: "bold" }}
        />
        <CardContent>
          {tickets?.map(ticket => {
            return <TicketsComponent {...ticket} />;
          })}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SwimlaneComponent;
