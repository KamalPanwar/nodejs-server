import app from './app.js';
import 'dotenv/config';
import mongoose from 'mongoose';

const port = process.env.port;
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('DB connections successful!');
});





app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
