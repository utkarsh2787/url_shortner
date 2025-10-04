import express from 'express'
import { shortUrlCreate } from '../controllers/shortUrl.controller.js';
const router = express();

router.post('/', shortUrlCreate)



export default router;
