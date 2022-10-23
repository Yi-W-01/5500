import UserDao from "../daos/UserDao";
export default class UserController {
    constructor() {
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then(users => res.json(users));
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then(user => res.json(user));
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
        this.deleteAllUsers = (req, res) => UserController.userDao.deleteAllUsers()
            .then((status) => res.send(status));
    }
}
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
UserController.userDao = UserDao.getInstance();
UserController.userController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @returns UserController
 */
UserController.getInstance = (app) => {
    if (UserController.userController === null) {
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
};
;
