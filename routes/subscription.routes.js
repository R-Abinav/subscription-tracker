import { Router } from 'express';
import { authorise } from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controllers.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    return res.send('GET all subscriptions');
});

subscriptionRouter.get('/:id', (req, res) => {
    return res.send('GET particular subscription details');
});

subscriptionRouter.post('/', authorise, createSubscription);

subscriptionRouter.put('/', (req, res) => {
    return res.send('UPDATE a subscription');
});

subscriptionRouter.delete('/', (req, res) => {
    return res.send('DELETE a subscription');
});

subscriptionRouter.get('/user/:id', authorise, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    return res.send('CANCEL subscription');
});

subscriptionRouter.put('/upcoming-renewals', (req, res) => {
    return res.send('GET upcoming renewals');
});

export default subscriptionRouter;