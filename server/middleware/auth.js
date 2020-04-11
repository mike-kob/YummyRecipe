import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

export const withAuth = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(
            token,
            secret,
            (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.googleId = decoded.googleId;
                next();
            }
        });
    }
};