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

export const discliplinesFetching = () => {
    return { 
        type: 'DISCLIPLINES_FETCHING'
    }
}

export const discliplinesFetched = (discliplines) => {
    return {
        type: 'DISCLIPLINES_FETCHED',
        payload: discliplines
    }
}

export const discliplinesFetchingError = () => {
    return {
        type: 'DISCLIPLINES_FETCHING_ERROR'
    }
}

export const userFetching = () => {
    return {
        type: 'USER_FETCHING'
    }
}

export const userFetched = (user) => {
    return { 
        type: 'USER_FETCHED',
        payload:user
    }
}

export const userFetchingError = () => {
    return {
        type: 'USER_FETCHING_ERROR'
    }
}

export const unconfirmedFetching = () => {
    return {
        type: 'UNCONFIRMED_FETCHING'
    }
}

export const unconfirmedFetched = (array) => {
    return { 
        type: 'UNCONFIRMED_FETCHED',
        payload: array
    }
}

export const unconfirmedFetchingError = () => {
    return {
        type: 'UNCONFIRMED_FETCHING_ERROR'
    }
}

