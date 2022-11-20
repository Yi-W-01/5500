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
/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @implements {UserDaoI} UserDaoI
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao {
    constructor() {
        /**
          * Removes all users from the database. Useful for testing
          * @returns Promise To be notified when all users are removed from the
          * database
          */
        this.deleteAllUsers = () => __awaiter(this, void 0, void 0, function* () { return UserModel.deleteMany({}); });
        /**
         * Finds all users from the database with given username and password.
         * @returns Promise To be notified when user is retrieved from the database
         */
        this.findUserByCredentials = (username, password) => __awaiter(this, void 0, void 0, function* () { return UserModel.findOne({ username: username, password: password }); });
        /**
          * Uses UserModel to retrieve single user document from users collection
          * by their username
          * @param {string} username User's username
          * @returns Promise To be notified when user is retrieved from the database
          */
        this.findUserByUsername = (username) => __awaiter(this, void 0, void 0, function* () { return UserModel.findOne({ username }); });
    }
    /**
     * Uses UserModel to retrieve all user documents from users collection
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.find();
        });
    }
    /**
      * Uses UserModel to retrieve single user document from users collection
      * @param {string} uid User's primary key
      * @returns Promise To be notified when user is retrieved from the database
      */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findById(uid);
        });
    }
    /**
      * Inserts user instance into the database
      * @param {User} user Instance to be inserted into the database
      * @returns Promise To be notified when user is inserted into the database
      */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.create(user);
        });
    }
    /**
      * Removes user from the database.
      * @param {string} uid Primary key of user to be removed
      * @returns Promise To be notified when user is removed from the database
      */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.deleteOne({ _id: uid });
        });
    }
    /**
      * Updates user with new values in database
      * @param {string} uid Primary key of user to be modified
      * @param {User} user User object containing properties and their new values
      * @returns Promise To be notified when user is updated in the database
      */
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
