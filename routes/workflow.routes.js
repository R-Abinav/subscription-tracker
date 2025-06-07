import { Router }  from "express";
import { sendRemainders } from "../controllers/workflow.controllers.js";

const workFlowRouter = Router();

workFlowRouter.post("/subscription/remainder", sendRemainders);

export default workFlowRouter;