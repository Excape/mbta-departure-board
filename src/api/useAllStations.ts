import { useEffect, useState } from "react";
import { Station } from "../models/station.model";
import { findRailStations } from "./mbta.api";

export default function useAllStations(): Station[] | null {
  const [stations, setStations] = useState<Station[] | null>(null);
  useEffect(() => {
    findRailStations().then((result: any) => {
      console.log(result);
      const parentStations = collectParentStations(result.data);
      const stations = mapMbtaStationsToStations(parentStations);
      console.log(stations);
      setStations(stations);
    });
  }, []);

  return stations;
}

function mapMbtaStationsToStations(mbtaResult: any[]): Station[] {
  return mbtaResult.map((station) => ({ id: station.id, name: station.name }));
}

function collectParentStations(stations: any[]) {
  return stations.map((station) => station.parent_station);
}
