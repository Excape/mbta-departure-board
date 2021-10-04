import { format } from "date-fns";
import JsonApi from "devour-client";

const mbtaApi = new JsonApi({ apiUrl: "https://api-v3.mbta.com/" });

const routeEndpoint = "route";
const stopEndpoint = "stop";
const scheduleEndpoint = "schedule";

mbtaApi.define(stopEndpoint, {
  name: "",
  zone: { jsonApi: "hasOne", type: "zone" },
  facilities: { jsonApi: "hasOne", type: "facilities" },
  parent_station: { jsonApi: "hasOne", type: stopEndpoint },
});

mbtaApi.define(scheduleEndpoint, {
  departure_time: "",
  direction_id: 0,
  route: { jsonApi: "hasOne", type: routeEndpoint },
});

mbtaApi.define(routeEndpoint, {
  direction_destinations: [],
  color: "",
  long_name: "",
});
export async function findRailStations(): Promise<any[]> {
  return mbtaApi.findAll(stopEndpoint, {
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
  return mbtaApi.findAll(scheduleEndpoint, {
    page: { limit: 10 },
    sort: "departure_time",
    include: "route",
    filter: {
      stop: stationId,
      date: format(departsAfter, "YYYY-MM-DD"),
      min_time: format(departsAfter, "HH:MM"),
      route_type: 2, // 2 = (Commuter) Rail
    },
  });
}
