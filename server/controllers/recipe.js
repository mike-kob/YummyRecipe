import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

const RECIPE_POPULATE = { path: 'owner', select: 'name photo_url' };

export const recipeList = async (req, res, next) => {
    try {
        const recipes = await Recipe.find().populate(RECIPE_POPULATE);
        res.status(200).send(recipes);
    } catch (err) {
        console.log(err);
        return next(err);
    };
};

export const recipeDetail = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate(RECIPE_POPULATE)
        res.status(200).send(recipe);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

export const createRecipe = async (req, res, next) => {
    try {
        const user = await User.findOne({ googleId: req.googleId })
        const recipe = await Recipe.create({
            ...req.body,
            owner: user._id,
            createDate: Date.now(),
        });
        res.status(201).send(recipe);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

export const updateRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findOne({_id: req.params.id}).populate({ path: 'owner', select: 'googleId' });
        if (recipe.owner.googleId !== req.googleId) {
            res.status(403).send();
            return;
        }

        if (req.body.name) {
            recipe.name = req.body.name;
        }
        if (req.body.category) {
            recipe.category = req.body.category;
        }
        if (req.body.photo_url) {
            recipe.photo_url = req.body.photo_url;
        }
        if (req.body.shortDesc) {
            recipe.shortDesc = req.body.shortDesc;
        }
        if (req.body.longDesc) {
            recipe.longDesc = req.body.longDesc;
        }
        await recipe.save();
        res.status(200).send(recipe);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

export const deleteRecipe = async (req, res, next) => {
    try {
        const user = await User.findOne({googleId: req.googleId});
        await Recipe.deleteOne({ _id: req.params.id, owner: user._id });
        res.status(204).send();
    } catch (err) {
        console.log(err);
        return next(err);
    }
};
