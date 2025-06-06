import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controllers.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req, res) => {
    return res.send({
        message: 'CREATE new user'
    });
});

userRouter.put('/:id', (req, res) => {
    return res.send({
        message: 'Update user'
    });
});

userRouter.delete('/:id', (req, res) => {
    return res.send({
        message: 'Delete user'
    });
});

export default userRouter;