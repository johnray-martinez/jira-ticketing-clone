import React from "react";

import { Ticket } from "@/types/swimlane";

import CardContent from "@mui/material/CardContent";
// import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { PALETTE } from "@/constants/palette";

const TicketsComponent = ({ id, description, user }: Ticket) => {
  return (
    <CardContent sx={{ backgroundColor: PALETTE.white, mb: 1, p: 1 }}>
      <Typography variant="overline" sx={{ fontSize: 11, fontWeight: "bold" }}>
        {id}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: 11,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
          mb: 1,
        }}
      >
        {description}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: 11 }}>
        {user.email}
      </Typography>
    </CardContent>
  );
};

export default TicketsComponent;
