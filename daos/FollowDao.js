var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import FollowModel from "../mongoose/follows/FollowModel";
export default class FollowDao {
    constructor() {
        this.findAllUsersThatUserIsFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel
                .find({ userFollowing: uid })
                .populate("userFollowed")
                .exec();
        });
        this.findAllUsersThatUserIsFollowedBy = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel
                .find({ userFollowed: uid })
                .populate("userFollowing")
                .exec();
        });
        this.userFollowsAnotherUser = (source_uid, target_uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.create({ userFollowing: source_uid, userFollowed: target_uid }); });
        this.userUnFollowsAnotherUser = (source_uid, target_uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteOne({ userFollowing: source_uid, userFollowed: target_uid }); });
        this.userUnFollowsAllUsers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteMany({ userFollowing: uid }); });
        this.userDeletesAllFollowers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteMany({ userFollowed: uid }); });
    }
}
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
