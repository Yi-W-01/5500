"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkModel_1 = require("../mongoose/bookmarks/BookmarkModel");
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @implements {BookmarkDaoI} BookmarkDaoI
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() {
        /**
         * Uses BookmarkModel to retrieve all users from bookmarks collection bookmarked a tuit
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when the bookmarks are retrieved from database
         */
        this.findAllUsersThatBookmarkedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedTuit: tid })
                .populate("bookmarkedBy")
                .exec();
        });
        /**
        * Uses BookmarkModel to retrieve all tuits from bookmarks collection bookmarked by a user
        * @param {string} uid User's primary key
        * @returns Promise To be notified when the bookmarks are retrieved from database
        */
        this.findAllTuitsBookmarkedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel_1.default
                .find({ bookmarkedBy: uid })
                .populate("bookmarkedTuit")
                .exec();
        });
        /**
         * Inserts bookmark instance into the database
         * @param {string} uid User's primary key
         * @param {string} tid Tuit's primary key
         * @returns Promise To be notified when bookmark is inserted into the database
         */
        this.userBookmarksTuit = (tid, uid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.create({ bookmarkedTuit: tid, bookmarkedBy: uid }); });
        /**
        * Remove bookmark instance from the database
        * @param {string} uid User's primary key
        * @param {string} tid Tuit's primary key
        * @returns Promise To be notified when bookmark is removed from the database
        */
        this.userUnbookmarksTuit = (tid, uid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid }); });
        /**
         * Remove all bookmark instances from the database bookmarked by a user
         * @param {string} uid User's primary key
         * @returns Promise To be notified when bookmarks are removed from the database
         */
        this.userUnbookmarksAllTuit = (uid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel_1.default.deleteMany({ bookmarkedBy: uid }); });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
//# sourceMappingURL=BookmarkDao.js.map