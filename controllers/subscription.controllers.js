import ENV from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });

        //Trigger the workflow!
        const { workflowRunId } = await workflowClient.trigger({
            url: `${ENV.SERVER_URL}/api/v1/workflows/subscription/remainder`,
            body:{
                subscriptionId: subscription.id,
            },
            headers:{
                'Content-Type': 'application/json',
            },
            retries: 0
        });

        res.status(201).json({
            success: true,
            message: "Subscription created!",
            data: { 
                subscription,
                workflowRunId
            }
        });
        
    }catch(err){
        next(err);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try{
        //Check if the user is same as the one in the token!
        if(req.user._id.toString() !== req.params.id){
            const error = new Error('You are not the owner of this account!');

            error.statusCode = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({
            user: req.params.id,
        });

        res.status(200).json({
            success: true, 
            data: subscriptions 
        })

    }catch(err){
        next(err);
    }
}