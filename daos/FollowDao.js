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
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @implements {FollowDaoI} FollowDaoI
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao {
    constructor() {
        /**
         * Uses FollowModel to retrieve all users following a user from follows collection
         * @param {string} uid actor user's primary key
         * @returns Promise To be notified when the follows are retrieved from database
         */
        this.findAllUsersThatUserIsFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel
                .find({ userFollowing: uid })
                .populate("userFollowed")
                .exec();
        });
        /**
         * Inserts follow instance into the database under user context shows one user follows another
         * @param {string} source_uid source/actor user's primary key
         * @param {string} target_uid target user's primary key
         * @returns Promise To be notified when the follow is inserted into database
         */
        this.findAllUsersThatUserIsFollowedBy = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel
                .find({ userFollowed: uid })
                .populate("userFollowing")
                .exec();
        });
        /**
         * Removes follow instance from the database
         * @param {string} source_uid source/actor user's primary key
         * @param {string} target_uid target user's primary key
         * @returns Promise To be notified when the follow is removed from database
         */
        this.userFollowsAnotherUser = (source_uid, target_uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.create({ userFollowing: source_uid, userFollowed: target_uid }); });
        /**
         * Removes follow instance from the database
         * @param {string} source_uid source/actor user's primary key
         * @param {string} target_uid target user's primary key
         * @returns Promise To be notified when the follow is removed from database
         */
        this.userUnFollowsAnotherUser = (source_uid, target_uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteOne({ userFollowing: source_uid, userFollowed: target_uid }); });
        /**
         * Removes all follow instances from the database initiated by a user
         * @param {string} uid source/actor user's primary key
         * @returns Promise To be notified when all follows are removed from database
         */
        this.userUnFollowsAllUsers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel.deleteMany({ userFollowing: uid }); });
        /**
         * Removes all follow instances from the database that have a target user
         * @param {string} uid target_uid target user's primary key
         * @returns Promise To be notified when all follows are removed from database
         */
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
