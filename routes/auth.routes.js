import { Router } from 'express';
import { logIn, logOut, signUp } from '../controllers/auth.controllers.js';

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/log-in', logIn);
authRouter.post('/log-out', logOut);

export default authRouter;