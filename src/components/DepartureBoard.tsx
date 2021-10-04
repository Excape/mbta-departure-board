import React from "react";
import { Card, List, ListItem } from "@mui/material";
import useDeparturesForStation from "../hooks/useDeparturesForStation";
import { Station } from "../models/station.model";
import DepartureCard from "./DepartureCard";

interface Props {
  station: Station;
}

function DepartureBoard(props: Props) {
  const departures = useDeparturesForStation(props.station.id);
  return (
    <Card>
      {departures && (
        <List>
          {departures.map((departure) => (
            <ListItem key={departure.scheduleId}>
              <DepartureCard departure={departure} />
            </ListItem>
          ))}
        </List>
      )}
    </Card>
  );
}

export default DepartureBoard;
