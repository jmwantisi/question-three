import dotenv from 'dotenv'
import app from './app'

dotenv.config();


app.listen(6001, () => {
	console.log(`app is listening to port ${6001}`);
})