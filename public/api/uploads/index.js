const express = require('express');
const path = require('path');
const app = express();
module.exports = app;

app.use(express.static('client'));

app.get('/', function (req, res) {
	res.send('Hello World /!');
});

app.get('/images', function (req, res) {
	res.sendFile(path.join(__dirname, '/uploads/2015/01/', '07animalfear-100x100.jpg'));
});

app.get('/:year/:month/:file', function (req, res) {
});

const port = process.env.PORT || 4040;
app.listen(port, () => console.log('Imge server listening on port', port))