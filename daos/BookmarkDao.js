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
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import TuitModel from "../mongoose/tuits/TuitModel";
import UserModel from "../mongoose/users/UserModel";
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao {
    constructor() {
        this.createBookmarkByUsers = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel.create({ bookmarkedBy: uid, tuit: tid }); });
        this.deleteBookmark = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return BookmarkModel.deleteOne({ bookmarkedBy: uid, tuit: tid }); });
        this.findAllBookmarkedTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel.
                find({ bookmarkedBy: uid }).
                then(bookmarks => {
                let res = [];
                for (const b of bookmarks) {
                    res.push(b.tuit);
                }
                return TuitModel.
                    find({ _id: {
                        $in: res
                    } }).
                    exec();
            });
        });
        this.findAllBookmarkedTuitsByViewedUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel.
                find({ bookmarkedBy: uid }).
                then(bookmarks => {
                let res = [];
                for (const b of bookmarks) {
                    res.push(b.tuit);
                }
                return TuitModel.
                    find({ _id: {
                        $in: res
                    } }).
                    exec();
            });
        });
        this.findAllUsersByTuitBookmarks = (tid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarkModel.
                find({ tuit: tid }).
                then(bookmarks => {
                let res = [];
                for (const b of bookmarks) {
                    res.push(b.bookmarkedBy);
                }
                return UserModel.
                    find({ _id: {
                        $in: res
                    } }).
                    exec();
            });
        });
    }
}
BookmarkDao.bookmarkDao = null;
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao === null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
