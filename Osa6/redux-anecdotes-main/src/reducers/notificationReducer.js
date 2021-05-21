const initialState = ""

export const notify = (msg) => {
    return {
        type: 'SET_NOTIFICATION',
        data: msg
    }
}


export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    }
}

export const setNotification = (msg, duration) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: msg,
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
            })
        }, duration)
    }
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return initialState
        default:
            return state
    }
}

export default notificationReducer