const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const admin = require('./.admin');
require('./db/mongoose');
const entryRouter = require('./routes/entries.routes');
const userRouter = require('./routes/users.routes');
const adminRouter = require('./routes/admin.routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.set('secretKey', admin.secretKey); // jwt secret token

app.use(express.json());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// const corsOptions = {
// 	origin: 'http://localhost:3001'
// };

// app.use(cors(corsOptions));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.get('/', (req, res) => {
	res.json({
		message: 'Vote on some outfits!'
	});
});

app.use(entryRouter);
app.use(userRouter);
app.use(adminRouter);


app.use(express.static(path.join(__dirname, '../frontend/build')));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
