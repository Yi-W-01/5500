/**
 * @file Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

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

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
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
    }

    private constructor() {}

    /**
     * Retrieves all tuits from the database and returns an array of tuits.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects
     */
    findAllTuits(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
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
    findTuitById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit))
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the tuit that matches the user ID
     */
    findTuitsByUser(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit))
    }

    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit))
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status))
    }

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteTuit(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status))
    }

}