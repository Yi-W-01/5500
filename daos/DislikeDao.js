var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DislikeModel from "../mongoose/dislikes/DislikesModel";
import UserModel from "../mongoose/users/UserModel";
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} disliakDao Private single instance of LikeDao
 */
export default class DislikeDao {
    constructor() {
        this.findAllUsersThatDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel
                .find({ tuit: tid })
                .then(dislikes => {
                let res = [];
                for (const d of dislikes) {
                    res.push(d.dislikedBy);
                }
                return UserModel
                    .find({ _id: { $in: res } })
                    .exec();
            });
        });
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel
                .find({ dislikedBy: uid })
                .populate({
                path: 'tuit',
                populate: {
                    path: 'postedBy'
                }
            })
                .exec();
        });
        this.findTuitDislikesCount = (tid) => __awaiter(this, void 0, void 0, function* () {
            return DislikeModel
                .countDocuments({ tuit: tid })
                .exec();
        });
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel.create({ tuit: tid, dislikedBy: uid }); });
        this.userUndislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid }); });
        this.findUserDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel.findOne({ tuit: tid, dislikedBy: uid }); });
    }
}
DislikeDao.dislikeDao = null;
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao === null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
