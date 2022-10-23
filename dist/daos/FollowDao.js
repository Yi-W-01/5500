"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowModel_1 = require("../mongoose/follows/FollowModel");
class FollowDao {
    constructor() {
        this.findAllUsersThatUserIsFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowing: uid })
                .populate("userFollowed")
                .exec();
        });
        this.findAllUsersThatUserIsFollowedBy = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowModel_1.default
                .find({ userFollowed: uid })
                .populate("userFollowing")
                .exec();
        });
        this.userFollowsAnotherUser = (source_uid, target_uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.create({ userFollowing: source_uid, userFollowed: target_uid }); });
        this.userUnFollowsAnotherUser = (source_uid, target_uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteOne({ userFollowing: source_uid, userFollowed: target_uid }); });
        this.userUnFollowsAllUsers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteMany({ userFollowing: uid }); });
        this.userDeletesAllFollowers = (uid) => __awaiter(this, void 0, void 0, function* () { return FollowModel_1.default.deleteMany({ userFollowed: uid }); });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
//# sourceMappingURL=FollowDao.js.map