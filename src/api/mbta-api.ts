import { format } from "date-fns";
import mbtaApi from "./mbta-config";

export async function findRailStations(): Promise<any[]> {
  return mbtaApi.findAll("stop", {
    filter: { route_type: 2 }, // 2 = (Commuter) Rail
    fields: { stop: "name" },
    sort: "name",
    include: "parent_station",
  });
}

export async function findScheduledDeparturesForStation(
  stationId: string,
  departsAfter: Date
): Promise<any[]> {
  return mbtaApi.findAll("schedule", {
    page: { limit: 10 },
    sort: "departure_time",
    include: "route,trip,prediction.stop",
    filter: {
      stop: stationId,
      date: format(departsAfter, "yyyy-MM-dd"),
      min_time: format(departsAfter, "HH:MM"),
      route_type: 2, // 2 = (Commuter) Rail
    },
    fields: {
      schedule: "departure_time",
      route: "color,long_name",
      trip: "name,headsign",
      stop: "platform_code,platform_name",
      prediction: "status",
    },
  });
}
