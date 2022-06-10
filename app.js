import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
// import teamsRoutes from './routes/teams_route';
// import eventsRoutes from './routes/events_routes';
// import membersRoutes from './routes/member_routes';

const app = express();
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json({
	limit: 1000000000000
}));

// app.use('/teams', teamsRoutes);
// app.use('/events', eventsRoutes);
// app.use('/members', membersRoutes);

module.exports = app;

