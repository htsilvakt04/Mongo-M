export function searchItemInState(state, searchText, arrayOfItemsId = null) { // just local function
    let result = [];
    const arrayToLoop = arrayOfItemsId ? arrayOfItemsId : Object.keys(state);

    arrayToLoop.forEach(id => {
        const regex = new RegExp(searchText, 'i');
        const item = state[id];
        const condition = item.title.search(regex) > -1 || item.description.search(regex) > -1 || item.category.search(regex) > -1;
        if (condition) {
            result.push(item)
        }
    });
    return result;
}