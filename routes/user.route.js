import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req, res) => res.send('get all users'))
userRouter.get('/:id', (req, res) => res.send('get all users'))
userRouter.post('/', (req, res) => res.send('get all users'))
userRouter.put('/:id', (req, res) => res.send('get all users'))
userRouter.delete('/:id', (req, res) => res.send('get all users'))
export default userRouter