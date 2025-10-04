import { nanoid } from "nanoid";

export const generateShortUrl = (length = 7) => {
    return  nanoid(length);

    

}