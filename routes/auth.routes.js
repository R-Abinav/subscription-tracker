import { Router } from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (req, res)=> {
    return res.send({
        message: 'Sign up'
    });
});

authRouter.post('/log-in', (req, res)=> {
    return res.send({
        message: 'Sign in'
    });
});

authRouter.post('/log-out', (req, res)=> {
    return res.send({
        message: 'Sign out'
    });
});

export default authRouter;