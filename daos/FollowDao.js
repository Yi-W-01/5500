var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowModel from "../mongoose/follows/FollowModel";
import UserModel from "../mongoose/users/UserModel";
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao {
    constructor() {
        this.createFollowByUsers = (followingUid, followedUid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.create({ userFollowed: followedUid, userFollowing: followingUid }); });
        this.deleteFollow = (followingUid, followedUid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteOne({ userFollowed: followedUid, userFollowing: followingUid }); });
        this.findAllUsersGivenUserIsFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel.
                find({ userFollowing: uid }).
                then(follows => {
                let res = [];
                for (const f of follows) {
                    res.push(f.userFollowed);
                }
                return UserModel.
                    find({ _id: {
                        $in: res
                    } }).
                    exec();
            });
        });
        this.findAllUsersGivenUserIsFollowedBy = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel.
                find({ userFollowed: uid }).
                then(follows => {
                let res = [];
                for (const f of follows) {
                    res.push(f.userFollowing);
                }
                return UserModel.
                    find({ _id: {
                        $in: res
                    } }).
                    exec();
            });
        });
    }
}
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
