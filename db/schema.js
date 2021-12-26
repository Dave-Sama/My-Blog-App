const mongoose = require('mongoose');

const listOfItemsSchema = new mongoose.Schema({
	title: String,
	content: String,
});

module.exports = {
	listOfItemsSchema,
};