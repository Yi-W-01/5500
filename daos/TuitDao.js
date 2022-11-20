var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @implements {TuitDaoI} TuitDaoI
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao {
    constructor() {
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.find()
                .populate("postedBy")
                .exec();
        });
        /**
         * Uses TuitModel to retrieve all tuit documents from tuits collection
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.find({ postedBy: uid })
                .populate("postedBy")
                .exec();
        });
        /**
         * Uses TuitModel to retrieve single tuit document from tuits collection
         * @param {string} tid User's primary key
         * @returns Promise To be notified when tuit is retrieved from the database
         */
        this.findTuitById = (tid) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.findById(tid)
                .populate("postedBy")
                .exec();
        });
        /**
         * Inserts tuit instance into the database under user context
         * @param {string} uid User's primary key
         * @param {Tuit} tuit Instance to be inserted into the database
         * @returns Promise To be notified when tuit is inserted into the database
         */
        this.createTuitByUser = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
         * Updates tuit with new values in database
         * @param {string} tid Primary key of tuit to be modified
         * @param {Tuit} tuit object containing properties and their new values
         * @returns Promise To be notified when tuit is updated in the database
         */
        this.updateTuit = (tid, tuit) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.updateOne({ _id: tid }, { $set: tuit });
        });
        /**
         * Removes tuit from the database.
         * @param {string} tid Primary key of tuit to be removed
         * @returns Promise To be notified when tuit is removed from the database
         */
        this.deleteTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return TuitModel.deleteOne({ _id: tid }); });
        /**
         * Updates tuit's stats in database
         * @param {string} tid Primary key of tuit to be modified
         * @param {any} newStats object of ne stats
         * @returns Promise To be notified when tuit is updated in the database
         */
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () {
            return TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } });
        });
        /**
         * Removes tuit from the database. Used for testing
         * @param {string} uid Primary key of the dummy user whose tuit to be removed
         * @returns Promise To be notified when tuit is removed from the database
         */
        this.deleteTuitByUserId = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel.deleteOne({ postedBy: uid }); });
        this.updateStats = (tid, newStats) => __awaiter(this, void 0, void 0, function* () { return TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } }); });
    }
}
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
