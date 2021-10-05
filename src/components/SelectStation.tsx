import { Autocomplete, TextField } from "@mui/material";
import React from "react";

import useAllStations from "../hooks/useAllStations";
import { Station } from "../models/station.model";

interface Props {
  onStationSelect: (station: Station) => void;
}

function SelectStation({ onStationSelect }: Props) {
  const stations = useAllStations();

  const options = stations?.map(mapStationToSelectOption);

  return (
    <div>
      <Autocomplete
        disablePortal
        options={options || []}
        disableClearable
        autoHighlight
        sx={{ width: "100%", maxWidth: 500 }}
        renderInput={(params: any) => (
          <TextField {...params} label="Select a station..." />
        )}
        onChange={(_, selectedOption) =>
          onStationSelect(
            mapSelectOptionToStation(selectedOption as AutocompleteOption)
          )
        }
      />
    </div>
  );
}

interface AutocompleteOption {
  readonly id: string;
  readonly label: string;
}
const mapStationToSelectOption = (station: Station): AutocompleteOption => ({
  id: station.id,
  label: station.name,
});

const mapSelectOptionToStation = (option: AutocompleteOption): Station => ({
  id: option.id,
  name: option.label,
});

export default SelectStation;
