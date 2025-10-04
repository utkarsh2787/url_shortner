import express from 'express'
import { nanoid } from 'nanoid'
import dotenv from 'dotenv'
import connectDB from './src/config/mongo.config.js'
import ShortUrl, { shortUrlSchema } from './src/models/shorturl.model.js'
import ShortUrlRoute from './src/routes/shortUrl.route.js'
import { redUrl } from './src/controllers/shortUrl.controller.js'
import { errorHandler } from './src/utils/errorHandler.js'
dotenv.config("./.env");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(5000, () => {
        connectDB()

    console.log('Server is running on http://localhost:5000')
})

app.use('/api/create', ShortUrlRoute);

app.use(errorHandler)
app.get('/:shorturl', redUrl);


