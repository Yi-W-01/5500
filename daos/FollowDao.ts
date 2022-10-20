import FollowDaoI from "../interfaces/FollowDao";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    findAllUsersThatUserIsFollowing = async (uid: String): Promise<Follow[]> => 
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    
    findAllUsersThatUserIsFollowedBy = async (uid: String): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("userFollowing")
            .exec();
    
    userFollowsAnotherUser = async (source_uid: String, target_uid: String): Promise<Follow> => 
        FollowModel.create({userFollowing: source_uid, userFollowed: target_uid});

    userUnFollowsAnotherUser = async (source_uid: String, target_uid: String): Promise<any> =>
        FollowModel.deleteOne({userFollowing: source_uid, userFollowed: target_uid});
    
    userUnFollowsAllUsers = async (uid: String): Promise<any> => 
        FollowModel.deleteMany({userFollowing: uid});
    
    userDeletesAllFollowers = async (uid: String): Promise<any> =>
        FollowModel.deleteMany({userFollowed: uid});
}