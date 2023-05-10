import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AppController from '../controllers/app.controller';
import userRoutes from '../../../../modules/users/infra/http/routes/User.routes';
import AppMiddleware from '../middlewares/App.middleware';

const routes = Router();
const middleware = new AppMiddleware();
const controller = new AppController();

// GLOBALS
// routes.use(
//   '/sessions', 
// sessionsRoutes
//   );

routes.use(
  '/users',
  // middleware.tokenExists, 
  userRoutes
  );


export default routes;
