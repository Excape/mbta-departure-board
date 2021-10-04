import { parseJSON } from "date-fns";
import { useEffect, useState } from "react";
import { Departure } from "../models/departure.model";
import { findScheduledDeparturesForStation } from "../api/mbta-api";

function useDeparturesForStation(stationId: string) {
  const [departures, setDepartures] = useState<Departure[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    findScheduledDeparturesForStation(stationId, new Date(), 10)
      .then((result: any) => result.data.map(convertMbtaScheduleToDeparture))
      .then((departures: Departure[]) => {
        setDepartures(departures);
        setIsLoading(false);
      });
  }, [stationId]);

  return { departures, isLoading };
}

function convertMbtaScheduleToDeparture(schedule: any): Departure {
  return {
    scheduleId: schedule.id,
    name: schedule.route.long_name,
    time: parseJSON(schedule.departure_time),
    destination: schedule.trip.headsign,
    trainNumber: schedule.trip.name,
    status: schedule.prediction?.status,
    platform: schedule.prediction?.stop?.platform_code,
    color: `#${schedule.route.color}`,
  };
}

export default useDeparturesForStation;
