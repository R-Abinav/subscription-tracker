import { Client as WorkFlowClient } from "@upstash/workflow";
import ENV from "./env.js";

export const workflowClient = new WorkFlowClient({
    baseUrl: ENV.QSTASH_URL,
    token: ENV.QSTASH_TOKEN,
});
