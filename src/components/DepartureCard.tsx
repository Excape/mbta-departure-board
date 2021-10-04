import styled from "@emotion/styled";
import { Card, Chip, Typography } from "@mui/material";
import format from "date-fns/format";
import React from "react";
import { Departure } from "../models/departure.model";
import { bp } from "../styling/breakpoints";

function DepartureCard({ departure }: { departure: Departure }) {
  const GridContainer = styled.div`
    width: 100%;
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "d t"
      "nr s"
      "n p";

    ${bp["aboveTablet"]} {
      grid-template-columns: 2fr 1fr 1fr 1fr;
      grid-template-areas:
        "d n t s"
        "nr . . p";
    }

    ${bp["aboveLaptop"]} {
      grid-template-columns: 2fr repeat(4, 1fr);
      grid-template-areas:
        "d nr n t s"
        ". . . . p";
    }
  `;
  const DestinationDiv = styled.div`
    grid-area: d;
    overflow-wrap: break-word;
  `;
  const NameDiv = styled.div`
    grid-area: n;
  `;
  const TimeDiv = styled.div`
    grid-area: t;
    justify-self: end;
  `;
  const StatusDiv = styled.div`
    grid-area: s;
    justify-self: end;
  `;

  const TrainNrDiv = styled.div`
    grid-area: nr;
    margin-bottom: 1em;
  `;

  const PlatformDiv = styled.div`
    grid-area: p;
    justify-self: end;
  `;

  const ColoredChip = styled.div`
    background-color: ${departure.color} !important;
    > span {
      color: white;
    }
  `;
  return (
    <GridContainer as={Card}>
      <DestinationDiv>
        <Typography variant="h6" component="span">
          {departure.destination}
        </Typography>
      </DestinationDiv>
      <NameDiv>
        <Chip component={ColoredChip} label={departure.name} />
      </NameDiv>
      <TimeDiv>
        <Typography variant="subtitle1" component="span">
          {format(departure.time, "p")}
        </Typography>
      </TimeDiv>
      <TrainNrDiv>Train #{departure.trainNumber}</TrainNrDiv>
      <StatusDiv>{departure.status || "Scheduled"}</StatusDiv>
      {departure.platform && (
        <PlatformDiv>Platform {departure.platform}</PlatformDiv>
      )}
    </GridContainer>
  );
}

export default DepartureCard;
