import React from "react";
import { Alert, Card, CircularProgress, List, ListItem } from "@mui/material";
import useDeparturesForStation from "../hooks/useDeparturesForStation";
import { Station } from "../models/station.model";
import DepartureCard from "./DepartureCard";

interface Props {
  station: Station;
}

function DepartureBoard(props: Props) {
  const { departures, isLoading } = useDeparturesForStation(props.station.id);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Card>
      {departures ? (
        <List>
          {departures.map((departure) => (
            <ListItem key={departure.scheduleId}>
              <DepartureCard departure={departure} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Alert severity="info">No departures found</Alert>
      )}
    </Card>
  );
}

export default DepartureBoard;
