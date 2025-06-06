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
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV,
};

export default ENV;