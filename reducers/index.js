const initialState = {
    selectedDay: '', 
    timetable: {},
    timetableStatus: 'idle', 
    discliplines: '', 
    discliplinesStatus: 'ídle', 
    changes: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_SELECTED_DAY':
            return {
                ...state, 
                selectedDay: action.payload
            }
        case 'TIMETABLE_FETCHING':
            return {
                ...state, 
                timetableStatus: 'loading'
            }
        case 'TIMETABLE_FETCHED':
            return {
                ...state, 
                timetableStatus: 'idle',
                timetable: action.payload
            }
        case 'TIMETABLE_FETCHING_ERROR':
            return {
                ...state, 
                timetableStatus: 'error'
            }
        case 'DISCLIPLINES_FETCHING':
            return {
                ...state, 
                discliplinesStatus: 'loading'
            }
        case 'DISCLIPLINES_FETCHED': 
            return {
                ...state, 
                discliplinesStatus: 'idle',
                discliplines: action.payload
            }
        case 'DISCLIPLINES_FETCHING_ERROR': 
            return {
                ...state, 
                discliplinesStatus: 'error'
            }
        default:
            return state
    }
}

export default reducer;