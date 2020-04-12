import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

export const recipeUserList = async (req, res, next) => {
    try {
        const user = await User.findOne({ googleId: req.googleId });
        const recipeList = await Recipe.find({ owner: user._id }).populate({ path: 'owner', select: 'name photo_url' });
        res.status(200).send(recipeList);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

export const recipeFavoriteList = async (req, res, next) => {
    try {
        const user = await User.findOne({ googleId: req.googleId }).populate('liked');
        res.status(200).send(user.liked);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

export const likeRecipe = async (req, res, next) => {
    try {
        const user = await User.findOne({ googleId: req.googleId });
        const recipe = await Recipe.findById(req.body.recipeId);

        if (!recipe) {
            res.status(404).send();
            return;
        }

        if (!user.liked.includes(recipe._id)) {
            user.liked.push(recipe._id);
            await user.save();
        }

        res.status(204).send();
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

export const unlikeRecipe = async (req, res, next) => {
    try {
        const user = await User.findOne({ googleId: req.googleId });
        const recipe = await Recipe.findById(req.body.recipeId);

        if (!recipe) {
            res.status(404).send();
            return;
        }

        if (user.liked.includes(recipe._id)) {
            user.update({liked: user.liked.filter(o => o.id !== recipe._id)});
            await user.save();
        }

        res.status(204).send();
    } catch (err) {
        console.log(err);
        return next(err);
    }
};
