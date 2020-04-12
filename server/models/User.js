import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId: String,
    photo_url: String,
    name: String,
    liked: [{ type: Schema.ObjectId, ref: 'Recipe', required: true }]
});

export default mongoose.model('User', userSchema);