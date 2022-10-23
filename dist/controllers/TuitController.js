"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = require("../daos/TuitDao");
/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor() { }
    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits(req, res) {
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    }
    /**
     * Retrieves all tuits from the database for a particular user and returns
     * an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findTuitById(req, res) {
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
    }
    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the user ID
     */
    findTuitsByUser(req, res) {
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit));
    }
    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuit(req, res) {
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    }
    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit(req, res) {
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
    }
    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuit(req, res) {
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
    }
}
exports.default = TuitController;
// app: Express;
// tuitDao: TuitDao;
// constructor(app: Express, tuitDao: TuitDao){
//     this.app = app;
//     this.tuitDao = tuitDao;
//     this.app.get('tuits');
// }
TuitController.tuitDao = TuitDao_1.default.getInstance();
TuitController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get("/api/tuits", TuitController.tuitController.findAllTuits);
        app.get("/api/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
        app.get("/api/tuits/:tid", TuitController.tuitController.findTuitById);
        //app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
        app.post("/api/tuits", TuitController.tuitController.createTuit);
        app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
        app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
    }
    return TuitController.tuitController;
};
//# sourceMappingURL=TuitController.js.map