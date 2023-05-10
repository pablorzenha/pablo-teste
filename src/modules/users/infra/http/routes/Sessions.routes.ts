import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import RefreshTokenController from '../controllers/RefreshToken.controller';
import { SessionsController } from '../controllers/Sessions.controller';
import SessionsMiddleware from '../middleware/Sessions.middleware';

const sessionsRoutes = Router();
const controller = new SessionsController();
const refreshController = new RefreshTokenController();
const sessionsMiddleware = new SessionsMiddleware();

sessionsRoutes.post(
  '/user',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsMiddleware.verifyUserType,
  controller.loginUser,
);

sessionsRoutes.post(
  '/company',
  celebrate({
    [Segments.BODY]: {
      cnpj: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsMiddleware.verifyCompanyType,
  controller.loginCompany,
);

sessionsRoutes.post(
  '/refresh',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().required(),
    },
  }),
  refreshController.handle,
);

export default sessionsRoutes;
