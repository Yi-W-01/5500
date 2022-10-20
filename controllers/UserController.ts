import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

export default class UserController implements UserControllerI {
//    app: Express;
//    userDao: UserDao;
//    constructor(app: Express, userDao: UserDao) {
//        this.app = app;
//        this.userDao = userDao;
//        this.app.get('/users', this.findAllUsers);
//        this.app.get('/users/:userid', this.findUserById);
//        this.app.post('/users', this.createUser);
//        this.app.delete('/users/:userid', this.deleteUser);
//        this.app.put('/users/:userid', this.updateUser);
//    }

    private static userDao: UserDao = UserDao.getInstance();
    private static userController: UserController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns UserController
     */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();

            // RESTful User Web service API
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.post("/api/users", UserController.userController.createUser);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
            app.delete("/api/users", UserController.userController.deleteAllUsers);
        }
        return UserController.userController;
    }

    private constructor() {}

   findAllUsers = (req: Request, res: Response) =>
   UserController.userDao.findAllUsers()
           .then(users => res.json(users));

   findUserById = (req: Request, res: Response) =>
   UserController.userDao.findUserById(req.params.userid)
           .then(user => res.json(user));
   createUser = (req: Request, res: Response) =>
   UserController.userDao.createUser(req.body)
           .then(user => res.json(user));
   deleteUser = (req: Request, res: Response) =>
   UserController.userDao.deleteUser(req.params.userid)
           .then(status => res.json(status));
   updateUser = (req: Request, res: Response) =>
   UserController.userDao.updateUser(req.params.userid, req.body)
           .then(status => res.json(status));
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));
};