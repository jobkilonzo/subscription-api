import { Router } from "express";
const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => res.send('get all users'))
subscriptionRouter.get('/:id', (req, res) => res.send('get all users'))
subscriptionRouter.post('/', (req, res) => res.send('get all users'))
subscriptionRouter.put('/:id', (req, res) => res.send('get all users'))
subscriptionRouter.delete('/:id', (req, res) => res.send('get all users'))
subscriptionRouter.get('/user/:id', (req, res) => res.send('get all users'))
subscriptionRouter.put('/:id/cancel', (req, res) => res.send('get all users'))
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send('get all users'))

export default subscriptionRouter