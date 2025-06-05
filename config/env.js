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
};

export default ENV;