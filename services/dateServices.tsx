export function matchDates(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

export const getShortWeekDay = (date: Date) => {
    return date.toLocaleString("en-UK", { weekday: "short" })
}

export const getlongWeekDay = (date: Date) => {
    return date.toLocaleString("en-UK", { weekday: "long" })
}

export const getShortMonth = (date: Date) => {
    return date.toLocaleString("en-UK", { month: "short" })
}

export const getlongMonth = (date: Date) => {
    return date.toLocaleString("en-UK", { month: "long" })
}


