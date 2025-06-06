import { config } from "dotenv";

// eslint-disable-next-line no-undef
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`})

// eslint-disable-next-line no-undef
export const {
    PORT,
    NODE_ENV,
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJET_ENV,
    ARCJET_KEY,
    QSTASH_URL,
    QSTASH_KEY,
    QSTASH_SECRET,
    QSTASH_TOKEN,
    SERVER_URL,
    EMAIL_PASSWORDS
} = process.env