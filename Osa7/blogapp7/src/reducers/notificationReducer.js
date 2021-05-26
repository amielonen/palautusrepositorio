const initialState = ""

export const setNotification = (message, messageType) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message,
                messageType
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
            })
        }, 5000)
    }
}

const notificationReducer = (state = { message: '', messageType: ''}, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.data.message,
                messageType: action.data.messageType
            }
        case 'REMOVE_NOTIFICATION':
            return {
                message: '', messageType: ''
            }
        default:
            return state
    }
}

export default notificationReducer