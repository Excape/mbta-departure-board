import { render, screen } from "@testing-library/react";

import DepartureBoard from "./DepartureBoard";

const testStation = { id: "foo", name: "bar" };

let mockDepartures = {};
jest.mock("../hooks/useDeparturesForStation", () => ({
  __esModule: true,
  default: () => mockDepartures,
}));

test("render spinner when loading", () => {
  // given
  mockDepartures = { departures: null, isLoading: true };

  // when
  render(<DepartureBoard station={testStation} />);

  // then
  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});

test("render info when no departures found", () => {
  // given
  mockDepartures = { departures: [], isLoading: false };

  // when
  render(<DepartureBoard station={testStation} />);

  // then
  const infoBox = screen.getByTestId("no-departures");
  expect(infoBox).toBeInTheDocument();
});
