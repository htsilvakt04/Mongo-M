function hydrateData(review) {
    return {
        comment: review.review,
        name: review.name,
        stars: review.stars,
        date: review.date
    }
}
const byID = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_REVIEW':
            const reviewToAdd = hydrateData(action.review);
            const id = action.review.id;
            const prevReviews = state.reviews || [];
            return {
                [id]: {
                    ...state,
                    reviews: [
                        ...prevReviews,
                        reviewToAdd
                    ]
                }
            }
        default:
            return state;
    }
}
export default byID;