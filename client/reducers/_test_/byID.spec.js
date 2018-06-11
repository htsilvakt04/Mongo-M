import byID from '../byID';
describe('Mini Reducer: byID', () => {
    function stateBefore() {
        return {
            3: {
                _id: 3,
                title: 'Stress Ball',
                slogan: 'Squeeze your stress away',
                description: 'The moment life piles more onto your already heaping plate and you start feeling hopelessly overwhelmed, take a stress ball in hand and squeeze as hard as you can. Take a deep breath and just let that tension go. Repeat as needed. It will all be OK! Having something small, portable and close at hand is a must for stress management.',
                stars: 0,
                category: 'Swag',
                img_url: '/img/products/stress-ball.jpg',
                price: 5,
                reviews: [
                    {
                        comment: 'Nice Product',
                        name: 'Silva',
                        stars: 4,
                        date: 1523184458373
                    }
                ]
            },
        }
    };
    function stateAfter(date) {
        return {
            3: {
                _id: 3,
                title: 'Stress Ball',
                slogan: 'Squeeze your stress away',
                description: 'The moment life piles more onto your already heaping plate and you start feeling hopelessly overwhelmed, take a stress ball in hand and squeeze as hard as you can. Take a deep breath and just let that tension go. Repeat as needed. It will all be OK! Having something small, portable and close at hand is a must for stress management.',
                stars: 0,
                category: 'Swag',
                img_url: '/img/products/stress-ball.jpg',
                price: 5,
                reviews: [
                    {
                        comment: 'Nice Product',
                        name: 'Silva',
                        stars: 4,
                        date: 1523184458373
                    },
                    {
                        comment: 'So cool',
                        name: 'Silva',
                        stars: 3,
                        date
                    }
                ]
            },
        }
        }
    it('has a initial state as expected', () => {
        expect(byID(undefined, {})).toEqual({});
    })
    it('return a new version of state[id] with the review being added', () => {
        const date = Date.now();

        expect(byID(stateBefore(), {
            type: 'ADD_REVIEW',
            review: {
                review: 'So cool',
                name: 'Silva',
                stars: 3,
                id: 3,
                date
            }
        })).toEqual(stateAfter(date));
    })
})
