/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/tuits/Tuit"
import TuitDaoI from "../interfaces/TuitDao"
import TuitModel from "../mongoose/tuits/TuitModel"
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find().populate("postedBy").exec();
    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection using the uid
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitsByUser(uid: string) : Promise<Tuit[]>{
        return await TuitModel.find({postedBy: uid});
    }
    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tid User's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tid: string): Promise<any>{
        return await TuitModel.find({tid}).populate("postedBy").exec();
    }
    /**
     * Inserts tuit instance into the database under user context
     * @param {string} uid User's primary key
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }
    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any>{
        return await TuitModel.updateOne({_id: tid}, {$set: Tuit});
    }
    /**
     * Removes tuit from the database.
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    async deleteTuit(tid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tid});
    } 
    /**
     * Inserts tuit instance into the database under user context
     * @param {string} uid User's primary key
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
     createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
     TuitModel.create({...tuit, postedBy: uid});

    updateLikes = async (tid, newStats) =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: {stats: newStats}});
}