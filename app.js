import express from "express"
import { PORT } from "./config/env.js"
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.route.js";
const app = express()

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscription', subscriptionRouter)
// })
app.listen(PORT, ()=>{
    console.log(`Subscription Tracker API is running on jttp://localhost:${PORT}`)
});

export default app
