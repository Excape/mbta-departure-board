import SelectStation from "./components/SelectStation";
import React, { useState } from "react";
import { Station } from "./models/station.model";

function App() {
  // const predictions = usePredictionsForSouthStation();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  return (
    <div className="App">
      <SelectStation onStationSelect={setSelectedStation} />
      {selectedStation && <div>You selected {selectedStation.id}</div>}
    </div>
  );
}
export default App;
