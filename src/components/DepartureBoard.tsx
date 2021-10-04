import useDeparturesForStation from "../api/useDeparturesForStation";
import { Station } from "../models/station.model";

interface Props {
  station: Station;
}

function DepartureBoard(props: Props) {
  const departures = useDeparturesForStation(props.station.id);
  return <div></div>;
}

export default DepartureBoard;
