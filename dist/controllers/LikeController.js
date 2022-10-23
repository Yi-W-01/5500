"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LikeDao_1 = require("../daos/LikeDao");
class LikeController {
    constructor() {
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        this.findAllTuitsLikedByUser = (req, res) => LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes => res.json(likes));
        this.userLikesTuit = (req, res) => LikeController.likeDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        this.userUnlikesTuit = (req, res) => LikeController.likeDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    }
}
exports.default = LikeController;
LikeController.likeDao = LikeDao_1.default.getInstance();
LikeController.likeController = null;
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.post("/api/users/:uid/likes/:tid", LikeController.likeController.userLikesTuit);
        app.delete("/api/users/:uid/likes/:tid", LikeController.likeController.userUnlikesTuit);
    }
    return LikeController.likeController;
};
//# sourceMappingURL=LikeController.js.map