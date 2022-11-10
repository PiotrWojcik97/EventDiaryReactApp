import { getMonth } from "./utils"

const globals = {
    currentMonthIndex: parseInt(getMonth()[1][2].format('MM')),
    currentEventClicked: 0
}
export default globals