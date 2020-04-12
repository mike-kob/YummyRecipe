import express from 'express';
import {
    recipeList,
    recipeDetail,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} from '../controllers/recipe.js';
import {
    login
} from '../controllers/auth.js';
import {
    likeRecipe,
    recipeFavoriteList,
    recipeUserList,
    unlikeRecipe,
} from '../controllers/profile.js'
import { withAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);

router.get('/recipes', recipeList);
router.post('/recipes', withAuth, createRecipe);

router.get('/recipes/:id', recipeDetail);
router.put('/recipes/:id', withAuth, updateRecipe);
router.patch('/recipes/:id', withAuth, updateRecipe);
router.delete('/recipes/:id', withAuth, deleteRecipe);

router.get('/profile/recipes', withAuth, recipeUserList);
router.get('/profile/liked', withAuth, recipeFavoriteList);

router.post('/like', withAuth, likeRecipe);
router.post('/unlike', withAuth, unlikeRecipe);

export default router;