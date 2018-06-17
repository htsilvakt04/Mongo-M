export const calculateRating = (item) => {
    let stars = 0;
    let numReviews = 0;
    let avg = 0;

    if ("reviews" in item) {
        numReviews = item.reviews.length;

        for (let i=0; i<numReviews; i++) {
            stars += Number(item.reviews[i].stars);
        }

        avg = stars / numReviews;
    }
    return {
        stars: Math.round(avg)
    }
}