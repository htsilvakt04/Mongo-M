const userSearchText = (state = '', action) => {
    if(action.input === undefined) return state;
    switch (action.type) {
        case 'UPDATE_USER_INPUT':
            return action.input;
        default:
            return state;
    }
}

export default userSearchText;
export const getText = (state) => state;