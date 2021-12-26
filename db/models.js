const mongoose = require('mongoose');
const { listOfItemsSchema } = require('./schema');

const listOfItems = mongoose.model('ListOfPosts', listOfItemsSchema);

const models = {
	List: listOfItems,
};

module.exports = { models };
