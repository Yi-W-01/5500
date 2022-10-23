"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarkDao_1 = require("../daos/BookmarkDao");
class BookmarkController {
    constructor() {
        this.findAllUsersThatBookmarkedTuit = (req, res) => BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(users => res.json(users));
        this.findAllTuitsBookemarkedByUser = (req, res) => BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(tuits => res.json(tuits));
        this.userBookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));
        this.userUnbookmarksTuit = (req, res) => BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
        this.userUnbookmarksAllTuit = (req, res) => BookmarkController.bookmarkDao.userUnbookmarksAllTuit(req.params.uid)
            .then(status => res.send(status));
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookemarkedByUser);
        app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
        app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
        app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
        app.delete("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userUnbookmarksAllTuit);
    }
    return BookmarkController.bookmarkController;
};
//# sourceMappingURL=BookmarkController.js.map