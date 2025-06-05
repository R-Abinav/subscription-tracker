import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    return res.send('GET all subscriptions');
});

subscriptionRouter.get('/:id', (req, res) => {
    return res.send('GET particular subscription details');
});

subscriptionRouter.post('/', (req, res) => {
    return res.send('CREATE a subscription');
});

subscriptionRouter.put('/', (req, res) => {
    return res.send('UPDATE a subscription');
});

subscriptionRouter.delete('/', (req, res) => {
    return res.send('DELETE a subscription');
});

subscriptionRouter.get('/user/:id', (req, res) => {
    return res.send('GET all user subscriptions');
});

subscriptionRouter.put('/:id/cancel', (req, res) => {
    return res.send('CANCEL subscription');
});

subscriptionRouter.put('/upcoming-renewals', (req, res) => {
    return res.send('GET upcoming renewals');
});

export default subscriptionRouter;