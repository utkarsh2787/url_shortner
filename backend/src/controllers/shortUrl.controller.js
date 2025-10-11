import { shortUrlIns } from "../services/shortUrl.service.js";
import { generateShortUrl } from "../utils/helper.js";
import ShortUrl from "../models/shorturl.model.js";
import { getLongUrl } from "../dao/shortUrl.dao.js";
import AppError from "../utils/errorHandler.js";

const shortUrlCreate = async (req, res) => {
    try {
        console.log(req.body);
        const { url } = req.body;
        const id = await shortUrlIns(url, req.user?.id || 0);
        console.log(id)
        res.send({ short_url: `${process.env.BASE_URL}/${id}` })

    }
    catch (err) {
        console.log(err)
        throw new AppError("internal server error"+ err, 500);
    }


}
const redUrl = async (req, res) => {
    const { shorturl } = req.params;
    const data = await getLongUrl(shorturl);
    if (!data) {
        throw new AppError("url not found", 404);
    }
    else {
        res.redirect(data.full_url);
    }
}
export { shortUrlCreate, redUrl };