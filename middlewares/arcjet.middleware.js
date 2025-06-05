import aj from '../config/arcjet.js'
import {request} from "express";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied) {
            if (decision.reason?.isRateLimit?.()) {
                return res.status(429).json({ error: 'Rate limit is exceeded' });
            }

            if (decision.reason?.isBot?.()) {
                return res.status(403).json({ error: 'Bots detected' });
            }

            return res.status(403).json({ error: 'Access denied' });
        }

        next();
    } catch (error) {
        console.error('AJ protect error:', error);
        next(error); // Pass to error-handling middleware
    }
}

export default arcjetMiddleware