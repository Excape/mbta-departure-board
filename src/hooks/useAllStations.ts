import { useEffect, useState } from "react";
import { Station } from "../models/station.model";
import { findRailStations } from "../api/mbta-api";

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
  return stations.map((station) => station.parent_station);
}

export default useAllStations;
