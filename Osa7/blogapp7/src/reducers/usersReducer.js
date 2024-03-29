import userService, { getAll } from '../services/userService'

export const initUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users,
        })
    }
}

const usersReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USERS':
            return action.data
        default:
            return state
    }
}

export default usersReducer