import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId: String,
    photo_url: String,
    name: String,
    likedRecipes: [{ type: Schema.ObjectId, ref: 'Recipe', required: true }]
});

export default mongoose.model('User', userSchema);