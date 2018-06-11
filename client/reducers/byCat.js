const byCat = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INIT_ITEM':
            const { data } = action;

            return Object.keys(data).reduce((init, key) => {
                let obj = data[key];
                let isExists = init[obj.category];
                if (!isExists) init[obj.category] = [];

                init[obj.category].push(obj._id);
                init.All.push(obj._id);
                return init;
            }, {All: []});
        default:
            return state;
    }
}

export default byCat;

export const getItemsIds = (state, cat) => state[cat]

export const getCatNameAndTotal = (state) =>
    Object.keys(state).map( catName => {
        return {name: catName, num: state[catName].length};
    })
