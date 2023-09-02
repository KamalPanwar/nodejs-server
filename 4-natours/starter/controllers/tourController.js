import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

export const checkId = (req, res, next, val) => {
  const { id } = req.params;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

export const checkBody=(req,res,next)=>{
  const {name,price}=req.body
 
   if(!name || !price){
     return  res.status(404).json({status:'fail',message:'bad request'})
   }
   next()
 }
export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    Time: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

export const getTour = (req, res) => {
  const { id } = req.params;

  const foundTour = tours.find((e) => e.id == id);

  res.status(200).json({
    status: 'sucess',
    data: { foundTour },
  });
};

export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

export const updateTour = (req, res) => {
 

  res.status(200).json({
    status: 'sucess',
    data: { tour: '<Updated Tour>' },
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({ status: 'sucess', data: null });
};
