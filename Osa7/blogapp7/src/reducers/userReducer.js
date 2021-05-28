import storage from '../utils/storage'

export const initializeUser = () => {
    return async dispatch => {
        const user = storage.loadUser()
        dispatch({
            type: 'INIT_USER',
            data: user,
        })
    }
}

export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user,
        })
    }
}

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT_USER':
            return action.data
        case 'SET_USER':
            return action.data
        default:
            return state
    }
}

export default userReducer