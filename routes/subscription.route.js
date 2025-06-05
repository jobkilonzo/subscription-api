import { Router } from "express";
import {authorize} from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscription} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send('get all users'))
subscriptionRouter.get('/:id', (req, res) => res.send('get all users'))
subscriptionRouter.post('/', authorize, createSubscription)
subscriptionRouter.put('/:id', (req, res) => res.send('get all users'))
subscriptionRouter.delete('/:id', (req, res) => res.send('get all users'))
subscriptionRouter.get('/user/:id', authorize, getUserSubscription)
subscriptionRouter.put('/:id/cancel', (req, res) => res.send('get all users'))
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send('get all users'))

export default subscriptionRouter