//For upstash modules use CommonJS Syntax!
//But we have type: module in package.json -> So to allow CommonJS
import { loadEnvFile } from 'process';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';

import { createRequire } from 'module';
import { sendRemainderEmail } from '../utils/sendEmail.js';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7,5,2,1];

export const sendRemainders = serve(async (context) => {
    //1. Extract the subscription id 
    const { subscriptionId } = context.requestPayload; //When we trigger a workflow, we will pass the id of the subscription that workflow is for.

    //Details abt the subscription
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active'){
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow!`);
        return;
    }

    for(const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        if(reminderDate.isAfter(dayjs())){
            //Sleep 
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);

        }
        
        if(dayjs().isSame(reminderDate, 'day')){
            //Ready to trigger the reminder
            await triggerReminder(context,`${daysBefore} days before reminder`, subscription)
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    //Here we are starting the context for 'get subscription'
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');

    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        
        //Send Email
        await sendRemainderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        })
    })
}