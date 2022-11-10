import dayjs from 'dayjs'

export function getMonth(month = dayjs().month() ){
    // future parameters 
    const POLISH_CALENDAR_FORMAT = 0
    const USA_CALENDAR_FORMAT = 1
    const WEEK_DAYS = 7
    const MONTH_WEEKS = 5
    
    const currentYear = dayjs().year()

    // firstDayOfTheMonth 0 to 6, where 0 is Sunday
    const firstDayOfTheMonth = dayjs(new Date(currentYear, month, POLISH_CALENDAR_FORMAT)).day()

    // negative calendar days causing
    let currentMonthCounter = 0 - firstDayOfTheMonth

    // 2 dimension's array holding calendar 5 weeks and
    const daysMatrix = new Array(MONTH_WEEKS).fill([]).map(() => {
        return new Array(WEEK_DAYS).fill(null).map(() => {
            currentMonthCounter++
            return dayjs(new Date(currentYear, month, currentMonthCounter))
        })
    })
    return daysMatrix
}

/**
 * 
 * @returns arr[CALENDAR_DAYS][USERS_NUMBER][EVENTS PER USER IN THAT DAY]
 */
function _create_3_DimensionalArray() {
    const NUM_DAYS = 32
    const NUM_USERS = 3
    
    // create first dimension
    let arr = new Array(NUM_DAYS).fill()
    // create the second dimension
    for(let i=0; i < arr.length; i++)
        arr[i] = new Array(NUM_USERS).fill()
    // create the third dimension
    for(let i=0; i < arr.length; i++)
        for(let j=0; j < arr[0].length; j++)
            arr[i][j] = new Array()
    return arr
}


// events are only monthly based (in case that event duration exceeds month it is divided to two, before entering database)
export function calculateEventTable(data){
    let arr = _create_3_DimensionalArray()
    
    data.data.forEach(event => {
        const startDate = new Date(event.start_date)
        const endDate = new Date(event.end_date)
        const user_id = event.user_id
        const colorName = event.event_type
        const eventID = event._id
        
        // handle multi-day event
        if(startDate.getDate() != endDate.getDate()) {
            for(let i=startDate.getDate(); i != endDate.getDate()+1; i++)
            {
                let start_time
                let end_time
                if(i == startDate.getDate())
                {
                    start_time = ((startDate.getHours()) / 24) + (startDate.getMinutes() / 1440)
                    end_time = 23.999 / 24
                }
                else if(i == endDate.getDate())
                {
                    start_time = 0
                    end_time = ((endDate.getHours()) / 24) + (endDate.getMinutes() / 1440)
                }
                else {
                    start_time = 0
                    end_time = 23.999 / 24
                }
                arr[i][user_id].push({
                    startTime: start_time,
                    endTime: end_time,
                    colorID: colorName,
                    eventID: eventID,
                })
            }
        }
        //handle event which duration does not exceed one day 
        else {
            let start_time = ((startDate.getHours()) / 24) + (startDate.getMinutes() / 1440)
            let end_time = ((endDate.getHours()) / 24) + (endDate.getMinutes() / 1440)
            
            arr[startDate.getDate()][user_id].push({
                startTime: start_time,
                endTime: end_time,
                colorID: colorName,
                eventID: eventID,
            })
        }
    })

    return arr
}

export const allowedColors = [
    "#A79AFF9F",
    "#FFBEBC9F",
    "#FFF5BA9F",
    "#85E3FF9F",
    "#D5AAFF9F",
]

export const smallImagesArray = [
    "dog_square_small.jpg",
    "face_baby_square_small.jpg",
    "face_girl_square_small.jpg",
]