export function isObject (item) {
    return Object.prototype.toString.call(item) === '[object Object]'
}

export function formatCategories(categories) {
    return categories.reduce((category, key) => {
        category[key._id] = key;
        return category;
    }, {});
}

export function formatItems(items) {
    return items.reduce((item, key) => {
        item[key._id] = key;
        return item
    }, {});
}

export function calculateItemsToDisplay(items, perPage, currentPage) {
    let bottom = (currentPage - 1) * perPage;
    let top =  perPage * currentPage;
    let arr = [];
    Object.keys(items).map((key, index) => {
        let item = items[key];
        if (index >= bottom && index < top) {
            arr.push(item)
        }
    });
    return arr;
}

export function calculateItemByCat(origin, catName) {
    let result = [];
    Object.keys(origin).forEach( item => {
        if (origin[item].category === catName) {
            result.push(origin[item])
        }
    });
    return result;
}

export function calculateItemBySearch(origin, search) {
    let searchReg = new RegExp(search, 'i');
    let result = [];
    Object.keys(origin).forEach( key => {
        let item = origin[key];
        let {title, slogan, description, category} = item;
        if (title.search(searchReg) >= 0 || slogan.search(searchReg) >= 0 || description.search(searchReg) >= 0 || category.search(searchReg) >= 0) {
            result.push(item);
        }
    });
    return result.reduce((item, key) => {
        item[key._id] = key;
        return item;
    }, {});
}

export function generateHomePageLink() {
    return {
        pathname: '/',
        search: `?cat=All`
    }
}
export function generateHomePageWithCatLink(category) {
    return {
        pathname: '/',
        search: `?cat=${category}`
    }
}