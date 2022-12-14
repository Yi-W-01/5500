var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import LikeModel from "../mongoose/likes/LikeModel";
import UserModel from "../mongoose/users/UserModel";
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao {
    constructor() {
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel.
                find({ tuit: tid }).
                then(likes => {
                let res = [];
                for (const l of likes) {
                    res.push(l.likedBy);
                }
                return UserModel.
                    find({ _id: {
                        $in: res
                    } }).
                    exec();
            });
        });
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel
                .find({ likedBy: uid })
                .populate({
                path: 'tuit',
                populate: {
                    path: 'postedBy'
                }
            })
                .exec();
        });
        this.findTuitLikesCount = (tid) => // (tid: string):
         __awaiter(this, void 0, void 0, function* () {
            return LikeModel
                .countDocuments({ tuit: tid })
                .exec();
        });
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel.create({ tuit: tid, likedBy: uid }); });
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel.deleteOne({ tuit: tid, likedBy: uid }); });
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel.findOne({ tuit: tid, likedBy: uid }); });
    }
}
LikeDao.likeDao = null;
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
