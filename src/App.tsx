import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import React, { useState } from "react";

import DepartureBoard from "./components/DepartureBoard";
import SelectStation from "./components/SelectStation";
import { Station } from "./models/station.model";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppContainer = styled.div`
  width: calc(100vw - 2em);
  max-width: 1024px;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

function App() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  return (
    <RootContainer>
      <AppContainer>
        <Typography variant="h3">Commuter Rail Departures</Typography>
        <SelectStation onStationSelect={setSelectedStation} />
        {selectedStation && <DepartureBoard station={selectedStation} />}
      </AppContainer>
    </RootContainer>
  );
}
export default App;
