require('dotenv').config();

const mongoose = require('mongoose');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();
const variables = require('./config/variables');

const router = require('./route');

app.use(koaBody());
app.use(cors({ origin: '*' }));
// app.use(responseHandler());
mongoose.set('strictQuery', false);
mongoose.connect(variables.connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(router.routes());
app.use(router.allowedMethods());

// Handling Uncaught Exception
process.on('uncaughtException', () => {
	process.exit(1);
});

const server = app.listen(variables.appPort, () => {
	// console.log(
	// 	`API server listening on port ${variables.appPort}, in ${variables.appEnv}`
	// );
});

module.exports = server;
