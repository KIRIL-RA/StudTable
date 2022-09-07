export const setSelectedDay = (value) => {
    return {
        type: 'SET_SELECTED_DAY', 
        payload: value
    }
} 

export const timetableFetching = () => {
    return {
        type: 'TIMETABLE_FETCHING'
    }
}

export const timetableFetched = (timetable) => {
    return {
        type: 'TIMETABLE_FETCHED',
        payload: timetable
    }
}

export const timetableFetchingError = () => {
    return {
        type: 'TIMETABLE_FETCHING_ERROR'
    }
}