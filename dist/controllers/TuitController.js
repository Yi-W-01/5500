"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TuitDao_1 = require("../daos/TuitDao");
class TuitController {
    constructor() { }
    findAllTuits(req, res) {
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    }
    findTuitById(req, res) {
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
    }
    findTuitsByUser(req, res) {
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit));
    }
    createTuit(req, res) {
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));
    }
    updateTuit(req, res) {
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
    }
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