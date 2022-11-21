/**
 * Holds global variables used in a project
 */

import { getMonth } from "./utils";
const globals = {
  currentMonthIndex: parseInt(getMonth()[1][2].format("MM")),
  currentYear: 0,
  currentEventClicked: 0,
  users: [],
  events: [],
  event_types: [],
  filters: undefined,
  sort: {start: 1, end: 31},
};
export default globals;
