import SelectStation from "./components/SelectStation";
import React, { useState } from "react";
import { Station } from "./models/station.model";
import DepartureBoard from "./components/DepartureBoard";

function App() {
  // const predictions = usePredictionsForSouthStation();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  return (
    <div className="App">
      <SelectStation onStationSelect={setSelectedStation} />
      {selectedStation && <DepartureBoard station={selectedStation} />}
    </div>
  );
}
export default App;
