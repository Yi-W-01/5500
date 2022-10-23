"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FollowDao_1 = require("../daos/FollowDao");
class FollowController {
    constructor() {
        this.findAllUsersThatUserIsFollowing = (req, res) => FollowController.followDao.findAllUsersThatUserIsFollowing(req.params.uid)
            .then(users => res.json(users));
        this.findAllUsersThatUserIsFollowedBy = (req, res) => FollowController.followDao.findAllUsersThatUserIsFollowedBy(req.params.uid)
            .then(follows => res.json(follows));
        this.userFollowsAnotherUser = (req, res) => FollowController.followDao.userFollowsAnotherUser(req.params.source_uid, req.params.target_uid)
            .then(follows => res.json(follows));
        this.userUnFollowsAnotherUser = (req, res) => FollowController.followDao.userUnFollowsAnotherUser(req.params.source_uid, req.params.target_uid)
            .then(status => res.send(status));
        this.userUnFollowsAllUsers = (req, res) => FollowController.followDao.userUnFollowsAllUsers(req.params.uid)
            .then(status => res.send(status));
        this.userDeletesAllFollowers = (req, res) => FollowController.followDao.userDeletesAllFollowers(req.params.uid)
            .then(status => res.send(status));
    }
    ;
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersThatUserIsFollowing);
        app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatUserIsFollowedBy);
        app.post("/api/users/:source_uid/follows/:target_uid", FollowController.followController.userFollowsAnotherUser);
        app.delete("/api/users/:source_uid/follows/:target_uid", FollowController.followController.userUnFollowsAnotherUser);
        app.delete("/api/users/:uid/follows", FollowController.followController.userUnFollowsAllUsers);
        app.delete("/api/users/:uid/followers", FollowController.followController.userDeletesAllFollowers);
    }
    return FollowController.followController;
};
//# sourceMappingURL=FollowController.js.map