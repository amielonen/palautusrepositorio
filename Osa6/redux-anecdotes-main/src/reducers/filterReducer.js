const initialState = ''

//tämän tilan tehtävänä on hallita filtterisääntöä, jonka avulla
//listassa näytetään anekdootit
//kun sääntö vaihtuu, se aiheuttaa muutoksen myös listaan

export const filterAnecdotes = (rule) => {
    return {
        type: 'SET_FILTER',
        data: rule
    }
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.data
        default:
            return initialState
    }
}

export default filterReducer