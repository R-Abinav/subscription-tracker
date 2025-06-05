import express from 'express';
import ENV from './config/env.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

import connectToDB from './database/mongodb.js';

const app = express();

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.get('/', (req, res) => {
  res.send('Hello from Server!');
});

app.listen(ENV.PORT, async () => {
    console.log(`Server running in ${ENV.NODE_ENV} mode on port : ${ENV.PORT}`);
    await connectToDB();
});

export default app;