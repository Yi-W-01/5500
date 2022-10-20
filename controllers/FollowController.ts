import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

export default class FollowController implements FollowControllerI{
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null){
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersThatUserIsFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatUserIsFollowedBy);
            app.post("/api/users/:source_uid/follows/:target_uid", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:source_uid/follows/:target_uid", FollowController.followController.userUnFollowsAnotherUser);
            app.delete("/api/users/:uid/follows", FollowController.followController.userUnFollowsAllUsers);
            app.delete("/api/users/:uid/followers", FollowController.followController.userDeletesAllFollowers);
        }
        return FollowController.followController;
    }

    private constructor() {};

    findAllUsersThatUserIsFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserIsFollowing(req.params.uid)
            .then(users => res.json(users));

    findAllUsersThatUserIsFollowedBy = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserIsFollowedBy(req.params.uid)
            .then(follows => res.json(follows));

    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.source_uid, req.params.target_uid)
            .then(follows => res.json(follows));

    userUnFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsAnotherUser(req.params.source_uid, req.params.target_uid)
            .then(status => res.send(status));

    userUnFollowsAllUsers = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsAllUsers(req.params.uid)
            .then(status => res.send(status));

    userDeletesAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.userDeletesAllFollowers(req.params.uid)
            .then(status => res.send(status));
}