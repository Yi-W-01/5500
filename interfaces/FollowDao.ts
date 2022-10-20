import Follow from "../models/follows/Follow"

export default interface followDaoI{
    findAllUsersThatUserIsFollowing (uid: String): Promise<Follow[]>;
    findAllUsersThatUserIsFollowedBy (uid: String): Promise<Follow[]>;
    userFollowsAnotherUser (source_uid: String, target_uid: String): Promise<Follow>;
    userUnFollowsAnotherUser (source_uid: String, target_uid: String): Promise<any>;
    userUnFollowsAllUsers (uid: String): Promise<any>;
    userDeletesAllFollowers (uid: String): Promise<any>;
}