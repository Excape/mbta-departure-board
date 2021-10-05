import { useEffect, useState } from "react";

import { findRailStations } from "../api/mbta-api";
import { Station } from "../models/station.model";

function useAllStations(): Station[] | null {
  const [stations, setStations] = useState<Station[] | null>(null);
  useEffect(() => {
    findRailStations()
      .then((result: any) => collectParentStations(result.data))
      .then((parentStations) => mapMbtaStationsToStations(parentStations))
      .then((stations) => setStations(stations));
  }, []);

  return stations;
}

function mapMbtaStationsToStations(mbtaResult: any[]): Station[] {
  return mbtaResult.map((station) => ({ id: station.id, name: station.name }));
}

function collectParentStations(stations: any[]) {
  // because the MBTA API is only giving us the "sub" stops (like a specific platform, not the whole station), we need to refer to their "parent" to get
  // the actual station
  return stations.map((station) => station.parent_station);
}

export default useAllStations;
