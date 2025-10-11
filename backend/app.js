import express from 'express'
import { nanoid } from 'nanoid'
import dotenv from 'dotenv'
import connectDB from './src/config/mongo.config.js'
import ShortUrl, { shortUrlSchema } from './src/models/shorturl.model.js'
import ShortUrlRoute from './src/routes/shortUrl.route.js'
import authRoute from './src/routes/authRoute.js'

import { redUrl } from './src/controllers/shortUrl.controller.js'
import { errorHandler } from './src/utils/errorHandler.js'
import cors from 'cors'
import { authMiddleware, optionalAuthMiddleware } from './src/middleware/auth.middleware.js'
import cookieParser from 'cookie-parser'
dotenv.config("./.env");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})); app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(optionalAuthMiddleware);
app.use('/api/create', ShortUrlRoute);
app.use(errorHandler);

app.get('/me', authMiddleware, (req, res) => { console.log(10); res.send({ user: req.user }); });

app.get('/:shorturl', redUrl);
app.use('/api/auth', authRoute);


app.listen(5000, () => {
    connectDB();
    console.log('Server is running on http://localhost:5000');
});


