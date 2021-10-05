import JsonApi from "devour-client";

import { modelDefinitons } from "./mbta-models";

const mbtaApi = new JsonApi({ apiUrl: "https://api-v3.mbta.com/" });

modelDefinitons.forEach((modelDefinition) => {
  mbtaApi.define(modelDefinition.endpoint, modelDefinition.model);
});

export default mbtaApi;
