import { getMonth } from "./utils"

const globals = {
    currentMonthIndex: parseInt(getMonth()[1][2].format('MM')),
    currentEventClicked: 0,
    users: [
        {
            id: 1,
            username: "admin"
        },
        {
            id: 2,
            username: "piotr"
        }
    ],
    events: [],
    event_types: []
}
export default globals