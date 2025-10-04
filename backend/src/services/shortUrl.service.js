import { saveShortUrl } from "../dao/shortUrl.dao.js";
import { generateShortUrl } from "../utils/helper.js";

export const shortUrlIns = async(fullUrl) => {
    const id =generateShortUrl(7);
     await saveShortUrl(fullUrl, id);
     console.log({id})
    return id;
}