import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mainRoute from './routes/main_route';

const app = express();
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json({
	limit: 1000000000000
}));

app.use('/', mainRoute);

module.exports = app;

