var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from "../mongoose/users/UserModel";
export default class UserDao {
    constructor() {
        this.deleteAllUsers = () => __awaiter(this, void 0, void 0, function* () { return UserModel.deleteMany({}); });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.find();
        });
    }
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findById(uid);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.create(user);
        });
    }
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.deleteOne({ _id: uid });
        });
    }
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.updateOne({ _id: uid }, { $set: user });
        });
    }
}
UserDao.userDao = null;
UserDao.getInstance = () => {
    if (UserDao.userDao === null) {
        UserDao.userDao = new UserDao();
    }
    return UserDao.userDao;
};
