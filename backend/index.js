const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
require('./db/mongoose');
const entryRouter = require('./routers/entries');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
// const corsOptions = {
// 	origin: 'http://localhost:3001'
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));

// simple route


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.get('/', (req, res) => {
	res.json({
		message: 'Vote on some outfits!'
	});
});

app.use(entryRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
