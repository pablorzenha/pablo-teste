import { errors } from 'celebrate';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'module-alias/register';
import 'reflect-metadata';
import http from 'http';
import routes from './routes/app.route';
import AppError from '../../errors/AppError';




const app: Application = express()
const serverHttp = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
  
    console.log(err);
  
    return response.status(400).json({
      status: 'error',
      message: err.message,
    });
  });


export default app