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
};
export default globals;
