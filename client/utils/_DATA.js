import axios from 'axios';
// use for init data + click in filter category + next-page
export function getItems(category = 'All', skip = 0, limit = 100) {
    let url = '/api/items';
    let query = {
        params: {
            category, skip, limit
        }
    }
    return new Promise((res, rej) => {
        return axios.get(url, query).then( ({data}) => res(data) ).catch( err => rej(err) );
    })
}

export function getCategories(name) {
    return new Promise((res, rej) => {
        let url = '/api/category/' + name;
        return axios.get(url).then(({data}) => res(data)).catch(err => rej(err));
    })
}

export function _addReview({review, name ,stars, id}) {
    let url = '/api/item/' + id  + '/reviews';

    return axios.post(url, {
        review, name, stars
    }).then(({data}) => data).catch(err => err);
}