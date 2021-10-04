import { format } from "date-fns";
import JsonApi from "devour-client";

const mbtaApi = new JsonApi({ apiUrl: "https://api-v3.mbta.com/" });

const routeEndpoint = "route";
const stopEndpoint = "stop";
const tripEndpoint = "trip";
const scheduleEndpoint = "schedule";
const predictionEndpoint = "prediction";

mbtaApi.define(stopEndpoint, {
  name: "",
  platform_code: "",
  platform_name: "",
  zone: { jsonApi: "hasOne", type: "zone" },
  facilities: { jsonApi: "hasOne", type: "facilities" },
  parent_station: { jsonApi: "hasOne", type: stopEndpoint },
});

mbtaApi.define(scheduleEndpoint, {
  departure_time: "",
  direction_id: 0,
  route: { jsonApi: "hasOne", type: routeEndpoint },
  prediction: { jsonApi: "hasOne", type: "prediction" },
  trip: { jsonApi: "hasOne", type: tripEndpoint },
  stop: { jsonApi: "hasOne", type: stopEndpoint },
});

mbtaApi.define(routeEndpoint, {
  color: "",
  long_name: "",
  line: { jsonApi: "hasOne", type: "line" },
});

mbtaApi.define(tripEndpoint, {
  name: "",
  headsign: "",
  // we don't use these, but devour needs them to de-serialize
  route: { jsonApi: "hasOne", type: routeEndpoint },
  route_pattern: { jsonApi: "hasOne", type: "route_pattern" },
  service: { jsonApi: "hasOne", type: "service" },
  shape: { jsonApi: "hasOne", type: "shape" },
});

mbtaApi.define(predictionEndpoint, {
  status: "",
  stop: { jsonApi: "hasOne", type: stopEndpoint },
  route: { jsonApi: "hasOne", type: routeEndpoint },
  trip: { jsonApi: "hasOne", type: tripEndpoint },
  vehicle: { jsonApi: "hasOne", type: "vehicle" },
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
    include: "route,trip,prediction.stop",
    filter: {
      stop: stationId,
      date: format(departsAfter, "yyyy-MM-dd"),
      min_time: format(departsAfter, "HH:MM"),
      route_type: 2, // 2 = (Commuter) Rail
    },
    fields: {
      schedule: "departure_time,direction_id",
      route: "color,long_name",
      trip: "name,headsign",
      stop: "platform_code,platform_name",
      prediction: "status",
    },
  });
}
