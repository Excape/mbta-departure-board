export type Endpoint = "route" | "stop" | "trip" | "schedule" | "prediction";

export interface ModelDefinition {
  endpoint: Endpoint;
  model: any;
}

export const modelDefinitons: ModelDefinition[] = [
  {
    endpoint: "stop",
    model: {
      name: "",
      platform_code: "",
      platform_name: "",
      zone: { jsonApi: "hasOne", type: "zone" },
      facilities: { jsonApi: "hasOne", type: "facilities" },
      parent_station: { jsonApi: "hasOne", type: "stop" },
    },
  },
  {
    endpoint: "schedule",
    model: {
      departure_time: "",
      route: { jsonApi: "hasOne", type: "route" },
      prediction: { jsonApi: "hasOne", type: "prediction" },
      trip: { jsonApi: "hasOne", type: "trip" },
      stop: { jsonApi: "hasOne", type: "stop" },
    },
  },
  {
    endpoint: "route",
    model: {
      color: "",
      long_name: "",
      line: { jsonApi: "hasOne", type: "line" },
    },
  },
  {
    endpoint: "trip",
    model: {
      name: "",
      headsign: "",
      // we don't use these, but devour needs them to de-serialize
      route: { jsonApi: "hasOne", type: "route" },
      route_pattern: { jsonApi: "hasOne", type: "route_pattern" },
      service: { jsonApi: "hasOne", type: "service" },
      shape: { jsonApi: "hasOne", type: "shape" },
    },
  },
  {
    endpoint: "prediction",
    model: {
      status: "",
      stop: { jsonApi: "hasOne", type: "stop" },
      route: { jsonApi: "hasOne", type: "route" },
      trip: { jsonApi: "hasOne", type: "trip" },
      vehicle: { jsonApi: "hasOne", type: "vehicle" },
    },
  },
];
