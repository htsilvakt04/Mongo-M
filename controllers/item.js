const Item = require('../modal/Item');

const retrieveItems = (req, res) => {
    let {skip, limit} = req.query;

    Item.find({})
        .then( (items, err) => res.json({data: items}));
}

module.exports = {
    retrieveItems
};