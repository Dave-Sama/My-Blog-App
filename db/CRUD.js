/* 
C : Create
R : Read
U : Update
D : Delete
*/

// Add item to the collection
const AddItem = (object) => {
	try {
		object.save();
		console.log('(*) Successfully added an item. (*) ');
	} catch (err) {
		console.log(err);
	}
};

// Add items to the collection
const AddItems = async (objects, model) => {
	await model.insertMany(objects, (err, addedItems) => {
		if (err) {
			console.log(err);
		} else {
			console.log(
				`(*) Succesfully saved ${addedItems.length} people to the Document. (*) `
			);
		}
	});
};

// Find all the documents inside a specific colletion.
const FindAll = async (model) => {
	try {
		await model
			.find((err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log('(*) Documents found:\n');
					res.forEach((element, index) => {
						console.log(`-------${index + 1}-------\n ${element}`);
					});
					items = res;
				}
			})
			.clone();
	} catch (err) {
		console.log(err);
	}
};

// Find -One- document inside a specific colletion.
const FindOne = (model, condition) => {
	model.findOne(condition, (err, res) => {
		if (err) {
			console.log(err);
		} else {
			console.log('(*) Documents found:\n');
			console.log(`${res}`);
			return res;
		}
	});
};

// Update a specific document based on ID.
const UpdateItem = (model, id, newData) => {
	model.updateOne({ _id: id }, newData, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('The document is successfully Updated .');
		}
	});
};

// Delete one Document
const DeleteOne = (model, id) => {
	model.deleteOne({ _id: id }, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('The document successfully deleted.');
		}
	});
};

// Delete many Documents
const DeleteMany = (model, condition) => {
	model.deleteMany(condition, (err, removeResult) => {
		if (err) {
			console.log(err);
		} else {
			if (removeResult.deletedCount > 0) {
				console.log(
					`(*) ${removeResult.deletedCount} Documents Successfully Deleted. (*)`
				);
			} else {
				console.log('(*) Cannot find any related Document. (*)');
			}
		}
	});
};

module.exports = {
	AddItem,
	AddItems,
	FindAll,
	FindOne,
	UpdateItem,
	DeleteOne,
	DeleteMany,
};