import limiter from 'express-rate-limit';


export const rateLimiter = limiter({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // limit each IP to 3 requests per windowMs,
    message: {
        message: "Too many requests from this IP, please try again after 5 minutes."
    }
});