const initialState = {
    selectedDay: '', 
    timetable: '',
    timetableStatus: 'idle', 
    discliplines: '', 
    discliplinesStatus: 'ídle',
    user: '',
    userStatus: 'idle',
    unconfirmed: [], 
    unconfirmedStatus: 'idle'
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
        case 'USER_FETCHING':
            return {
                ...state, 
                userStatus: 'loading'
            }
        case 'USER_FETCHED': 
            return {
                ...state, 
                userStatus: 'idle',
                user: action.payload
            }
        case 'USER_FETCHING_ERROR': 
            return {
                ...state, 
                userStatus: 'error'
            }
        case 'UNCONFIRMED_FETCHING':
            return {
                ...state, 
                unconfirmedStatus: 'loading'
            }
        case 'UNCONFIRMED_FETCHED':
            return {
                ...state, 
                unconfirmedStatus: 'idle',
                unconfirmed: action.payload
            }
        case 'UNCONFIRMED_FETCHING_ERROR':
            return {
                ...state, 
                unconfirmedStatus: 'error'
            }
        default:
            return state
    }
}

export default reducer;