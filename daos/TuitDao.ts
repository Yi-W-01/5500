import Tuit from "../models/tuits/Tuit"
import TuitDaoI from "../interfaces/TuitDao"
import TuitModel from "../mongoose/tuits/TuitModel"

export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find().populate("postedBy").exec();

    async findTuitsByUser(uid: string) : Promise<Tuit[]>{
        return await TuitModel.find({postedBy: uid});
    }
    async findTuitById(tid: string): Promise<any>{
        return await TuitModel.find({tid}).populate("postedBy").exec();
    }
    async createTuit(tuit: Tuit): Promise<Tuit>{
        return await TuitModel.create(tuit);
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any>{
        return await TuitModel.updateOne({_id: tid}, {$set: Tuit});
    }
    async deleteTuit(tid: string): Promise<any>{
        return await TuitModel.deleteOne({_id: tid});
    } 
}