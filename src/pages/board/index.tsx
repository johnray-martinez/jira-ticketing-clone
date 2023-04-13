import React from "react";

import { Swimlane } from "@/types/swimlane";
import SwimlaneComponent from "@/components/board/swimlanes";

import { Grid as GridBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const LoremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

const swimlanes: Swimlane[] = [
  {
    status: {
      id: "1",
      name: "TO DO",
    },
    tickets: [
      {
        id: "Tix-1234",
        name: "Ticket Sample 1",
        description: LoremIpsum,
        user: {
          email: "sample@sample.com",
          displayName: "Sample 1",
          project: ["Project1"],
        },
      },
      {
        id: "Tix-1233",
        name: "Ticket Sample 1.2",
        description: LoremIpsum,
        user: {
          email: "sample1.2@sample.com",
          displayName: "Sample 2",
          project: ["Project1.2"],
        },
      },
    ],
  },
  {
    status: {
      id: "2",
      name: "DRAFTING",
    },
    tickets: [
      {
        id: "Tix-1233",
        name: "Ticket Sample 2",
        description: LoremIpsum,
        user: {
          email: "sample2@sample.com",
          displayName: "Sample 2",
          project: ["Project2"],
        },
      },
    ],
  },
  {
    status: {
      id: "3",
      name: "IN PROGRESS",
    },
    tickets: [
      {
        id: "Tix-124",
        name: "Ticket Sample 3",
        description: LoremIpsum,
        user: {
          email: "sample3@sample.com",
          displayName: "Sample 3",
          project: ["Project1"],
        },
      },
    ],
  },
  {
    status: {
      id: "4",
      name: "IN REVIEW",
    },
    tickets: [
      {
        id: "Tix-1254",
        name: "Ticket Sample 4",
        description: LoremIpsum,
        user: {
          email: "sample4@sample.com",
          displayName: "Sample 4",
          project: ["Project2"],
        },
      },
    ],
  },
  {
    status: {
      id: "5",
      name: "APPROVED",
    },
    tickets: [
      {
        id: "Tix-1224",
        name: "Ticket Sample 5",
        description: LoremIpsum,
        user: {
          email: "sample5@sample.com",
          displayName: "Sample 5",
          project: ["Project1"],
        },
      },
    ],
  },
];

const Grid = styled(GridBase)`
  .MuiGrid-root {
    flex-grow: 1;
  }
`;

const BoardPage = () => {
  return (
    <Grid
      container
      wrap="nowrap"
      sx={{
        overflow: "auto",
        fontSize: 12,
        m: 5,
        width: "auto",
      }}
    >
      {swimlanes.map(swimlane => {
        return <SwimlaneComponent key={swimlane.status.id} {...swimlane} />;
      })}
    </Grid>
  );
};

export default BoardPage;
