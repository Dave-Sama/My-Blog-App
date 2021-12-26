//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db/connect');
const {
	AddItem,
	AddItems,
	FindAll,
	UpdateItem,
	DeleteOne,
	DeleteMany,
	FindOne,
} = require('./db/CRUD');
const _ = require('lodash');
const { models } = require('./db/models');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
	models.List.find({}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.render('home', { content: result });
		}
	});
});
app.get('/about', (req, res) => {
	res.render('about', { content: aboutContent });
});
app.get('/contact', (req, res) => {
	res.render('contact', { content: contactContent });
});
app.get('/compose', (req, res) => {
	res.render('compose', { compose: 'compose' });
});
app.get('/posts/:theme', (req, res) => {
	const title = _.lowerCase(req.params.theme);
	console.log(title);
	newPost.forEach((element, index) => {
		console.log(element);
		if (element.title === title) {
			console.log('Match found!');
		} else if (index === newPost.length - 1 && element.title !== title) {
			console.log('No Match Found.');
		}
	});
});

app.get('/post/:title', (req, res) => {
	const title = _.capitalize(_.lowerCase(req.params.title));
	console.log(title);

	models.List.find({ title: title }, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.render('post', { post: result[0] });
		}
	});
	// let post = {};
	// newPost.forEach((element, index) => {
	// 	if (_.lowerCase(element.title) === title) {
	// 		post = element;
	// 	}
	// });
	// if (_.isEmpty(post)) {
	// 	res.render('post', {
	// 		post: { post: 'Cannot find a Match...', content: '' },
	// 	});
	// } else {
	// 	res.render('post', { post });
	// }
});

app.post('/compose', (req, res) => {
	const { titleInput, contentInput } = req.body;
	AddItem(new models.List({ title: titleInput, content: contentInput }));
	res.redirect('/');
});

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();
