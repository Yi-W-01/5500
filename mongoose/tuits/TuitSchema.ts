import * as mongoose from 'mongoose'
import User from "../../models/users/User";

const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
},{collection: "tuits"});
export default TuitSchema;