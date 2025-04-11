import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config();

const DB = process.env.DATABASE.replace(
	'<db_password>',
	process.env.DATABASE_PASSWORD,
);

mongoose
	.connect(DB)
	.then(() => console.log('DB connection successful!'))
	.catch((err) => console.error('DB connection error', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});