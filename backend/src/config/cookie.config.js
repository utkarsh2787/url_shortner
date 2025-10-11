export const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production,
    sameSite: 'lax', // Adjust based on your requirements
    maxAge: 5 * 60 * 1000 
};