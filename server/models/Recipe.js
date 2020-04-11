import mongoose from "mongoose";

const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    createDate: { type: Date, default: Date.now },
    name: String,
    category: [String],
    photo_url: String,
    shortDesc: String,
    longDesc: String,
    userGoogleId: String,
    owner: { type: Schema.ObjectId, ref: 'User', required: true },
});

export default mongoose.model('Recipe', recipeSchema);