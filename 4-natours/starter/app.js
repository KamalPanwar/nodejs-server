import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js'
import userRouter from './routes/userRoutes.js'


const app = express();

 

////////////////////Middleware/////////////////

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


////////////////////Routes///////////////
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app