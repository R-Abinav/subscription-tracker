import express from 'express';
import ENV from './config/env.js';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import workFlowRouter from './routes/workflow.routes.js';

import connectToDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import { arcjetMiddleware } from './middlewares/arcjet.middleware.js';

const app = express();

//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(arcjetMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

//Workflows
app.use('/api/v1/workflows', workFlowRouter);

//Error middleware
app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Hello from Server!');
});

app.listen(ENV.PORT, async () => {
    console.log(`Server running in ${ENV.NODE_ENV} mode on port : ${ENV.PORT}`);
    await connectToDB();
});

export default app;