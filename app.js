import express from 'express';
import { PORT } from './config/env.js'; 

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello!");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

export default app;