import { config } from 'dotenv';
import path from 'path';

//path.resolve => always finds the file!
config({
    path: path.resolve(
        process.cwd(),
        `.env.${process.env.NODE_ENV || 'development'}.local`
    )
});

const ENV = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    SERVER_URL: process.env.SERVER_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV,
    QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY,
    QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_TOKEN: process.env.QSTASH_TOKEN,
    QSTASH_URL: process.env.QSTASH_URL,
    SENDER_EMAIL: process.env.NODEMAILER_EMAIL,
    SENDER_AUTH: process.env.NODEMAILER_AUTH,
};


export default ENV;