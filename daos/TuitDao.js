var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
export default class TuitDao {
    constructor() {
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel.find().populate("postedBy").exec(); });
    }
    findTuitsByUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel.find({ postedBy: uid });
        });
    }
    findTuitById(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel.find({ tid }).populate("postedBy").exec();
        });
    }
    createTuit(tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel.create(tuit);
        });
    }
    updateTuit(tid, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel.updateOne({ _id: tid }, { $set: Tuit });
        });
    }
    deleteTuit(tid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel.deleteOne({ _id: tid });
        });
    }
}
TuitDao.tuitDao = null;
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
