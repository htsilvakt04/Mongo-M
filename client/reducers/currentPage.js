const currentPage = (state = 1, action) => {
    switch (action.type) {
        case 'CHANGE_PAGE':
            return action.id;
        default:
            return state;
    }
}

export default currentPage;
