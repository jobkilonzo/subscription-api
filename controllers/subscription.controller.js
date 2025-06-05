import Subscription from "../models/subscription.models.js";
import {workflowClient} from "../config/upstash.js";
import {SERVER_URL} from "../config/env.js";


export const createSubscription = async (req, res, next) => {
    try {
        const newSubscription = await Subscription.create({
            ...req.body,
            user: req.user.id
        })
        const {workflowRunID} = await workflowClient.trigger( {
            url: `${SERVER_URL}/api/v1/workflows/v1/subscription/reminder`,
            body: {
                subscriptionId: newSubscription.id,
            },
            headers: {
                'content-type': 'application/json'
            },
            retries: 0
        })
        res.status(200).json({success: true, data: {newSubscription, workflowRunID}})
    }catch (error) {
        next(error)
    }
}
export const getUserSubscription = async (req, res, next) => {
    try {


        if (req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this subscription')
            error.statusCode = 401
            throw error
        }
        const subscriptions = await Subscription.find({user: req.params.id})

        res.status(201).json({success: true, data: subscriptions})
    }catch (error) {
        next(error)
    }
}


