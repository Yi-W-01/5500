import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI{
    // app: Express;
    // tuitDao: TuitDao;
    // constructor(app: Express, tuitDao: TuitDao){
    //     this.app = app;
    //     this.tuitDao = tuitDao;
    //     this.app.get('tuits');
    // }

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.get("/users/:uid/tuits", TuitController.tuitController.findTuitsByUser);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            //app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.post("/tuits", TuitController.tuitController.createTuit);
            app.put("/tuits/:uid", TuitController.tuitController.updateTuit);
            app.delete("/tuits/:uid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }

    private constructor() {}

    findAllTuits(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
    }

    findTuitById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit))
    }

    findTuitsByUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit))
    }

    createTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit))
    }

    updateTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status))
    }

    deleteTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status))
    }

}