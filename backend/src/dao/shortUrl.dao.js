import ShortUrl from "../models/shorturl.model.js";

export const saveShortUrl = async (fullUrl, shortUrl, userId) => {
    const newShortUrl = new ShortUrl({ full_url: fullUrl, short_url: shortUrl, ...userId>0 && { user: userId } });
    if (userId) {
        newShortUrl.user = userId;
    }
    await newShortUrl.save();
    return newShortUrl;
}
export const getLongUrl = async (shortUrl) => {
    const data = await ShortUrl.findOneAndUpdate({ short_url: shortUrl }, { $inc: { clicks: 1 } });

    return data;
}
