import Bookmark from "../models/bookmarks/bookmarks";

export default interface bookmarkDao{
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    userUnbookmarksAllTuit (uid: string): Promise<any>;
}