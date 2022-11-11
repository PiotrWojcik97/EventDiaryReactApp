import { getMonth } from "./utils";

const globals = {
  currentMonthIndex: parseInt(getMonth()[1][2].format("MM")),
  currentEventClicked: 0,
  users: [
    {
      id: 1,
      username: "admin",
    },
    {
      id: 2,
      username: "piotr",
    },
  ],
  events: [
    {
      id: 1,
      user_id: 3,
      type_id: 4,
      name: "Bali Vacations",
      start_time: "2022-11-02 01:01:00",
      end_time: "2022-11-05 14:59:00",
      short_description: "I'm going on vacations!",
      long_description:
        "Kid is throwing a party at my place. I don't wanna be there at that time- perfect time for a vacations!",
    },
  ],
  event_types: [],
};
export default globals;
