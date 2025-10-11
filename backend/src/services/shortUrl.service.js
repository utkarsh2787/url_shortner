import { saveShortUrl } from "../dao/shortUrl.dao.js";
import { generateShortUrl } from "../utils/helper.js";

export const shortUrlIns = async(fullUrl, userid) => {
    const id =generateShortUrl(7);
     await saveShortUrl(fullUrl, id, userid);
    return id;
}