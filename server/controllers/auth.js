import auth from 'google-auth-library';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const client = new auth.OAuth2Client(process.env.CLIENT_ID);

export const login = async (req, res, next) => {
    const payload = await verify(req.body.tokenId);
    let user = await User.findOne({ googleId: payload['sub'] });

    if (!user) {
        user = new User({
            googleId: payload['sub'],
            name: payload['name'],
            photo_url: payload['picture']
        });

        await user.save();
    }

    const token = jwt.sign({ googleId:payload['sub'] }, process.env.SECRET);
    res.status(200).send({token: token, _id: user._id, liked: user.liked});
};

export const verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
};