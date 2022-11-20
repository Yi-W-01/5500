var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>GET /api/users/:uid/likes/:tid to record if a user likes a tuit
 *     </li>
 *     <li>PUT /api/users/:uid/likes/:tid to toggle that a user likes a tuit
 *     </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {TuitDao} tuitDao Singleton DAO implementing tuits CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController {
    constructor() {
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents request from client, including the path
         * parameter tid representing the liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsersThatLikedTuit = (req, res) => LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findAllTuitsLikedByUser = (req, res) => {
            const uid = req.params.uid;
            // @ts-ignore
            const profile = req.session['profile'];
            const userId = uid === 'me' && profile ?
                profile._id : uid;
            LikeController.likeDao.findAllTuitsLikedByUser(userId)
                .then(likes => {
                // filter out likes with null tuits. Only keep defined tuits
                // extract tuit object from likes respond with tuits
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
        };
        /**
         * Check if the user has already liked the tuit
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user, and the tid representing the tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON object containing the like objects or null
         */
        this.findUserLikedTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const uid = req.params.uid;
            const tid = req.params.tid;
            // @ts-ignore
            const profile = req.session['profile'];
            const userId = uid === 'me' && profile ?
                profile._id : uid;
            LikeController.likeDao.findUserLikesTuit(userId, tid)
                .then(like => res.json(like));
        });
        /**
         * @param {Request} req Represents request from client, including the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userTogglesTuitLikes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const likeDao = LikeController.likeDao;
            const tuitDao = LikeController.tuitDao;
            const uid = req.params.uid;
            const tid = req.params.tid;
            // @ts-ignore
            const profile = req.session['profile'];
            const userId = uid === 'me' && profile ?
                profile._id : uid;
            try {
                const userAlreadyLikedTuit = yield likeDao.findUserLikesTuit(userId, tid);
                const howManyLikedTuit = yield likeDao.countHowManyLikedTuit(tid);
                let tuit = yield tuitDao.findTuitById(tid);
                if (userAlreadyLikedTuit) {
                    yield likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
                else {
                    yield LikeController.likeDao.userLikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit + 1;
                }
                yield tuitDao.updateLikes(tid, tuit.stats);
                res.sendStatus(200);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
LikeController.likeDao = LikeDao.getInstance();
LikeController.tuitDao = TuitDao.getInstance();
LikeController.likeController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return LikeController
 */
LikeController.getInstance = (app) => {
    if (LikeController.likeController === null) {
        LikeController.likeController = new LikeController();
        app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser);
        app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTuit);
        app.get("/api/users/:uid/likes/:tid", LikeController.likeController.findUserLikedTuit);
        app.put("/api/users/:uid/likes/:tid", LikeController.likeController.userTogglesTuitLikes);
    }
    return LikeController.likeController;
};
;
