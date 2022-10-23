"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const UserController_1 = require("./controllers/UserController");
const TuitController_1 = require("./controllers/TuitController");
const BookmarkController_1 = require("./controllers/BookmarkController");
const FollowController_1 = require("./controllers/FollowController");
const MessageController_1 = require("./controllers/MessageController");
const LikeController_1 = require("./controllers/LikeController");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
//connect to native database
//mongoose.connect('mongodb://localhost:27017/tuit-db');
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = "1w";
const DB_PASSWORD = "5500";
const HOST = "cluster0.9xnxk7s.mongodb.net";
const DB_NAME = "tuit-db";
const DB_QUERY = "retryWrites=true&w=majority";
//const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
const connectionString = `mongodb+srv://1w:5500@cluster0.9xnxk7s.mongodb.net/?retryWrites=true&w=majority`;
// connect to the database
mongoose.connect(connectionString);
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering'));
//create RESTful APIs
const userController = UserController_1.default.getInstance(app);
const tuitController = TuitController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageController = MessageController_1.default.getInstance(app);
const likeController = LikeController_1.default.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
//# sourceMappingURL=server.js.map