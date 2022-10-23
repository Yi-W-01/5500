/**
 * @file Implements an Express Node HTTP server.
 */
import express from 'express';
import mongoose from 'mongoose';
import UserController from './controllers/UserController';
import TuitController from './controllers/TuitController';
import BookmarkController from './controllers/BookmarkController';
import FollowController from './controllers/FollowController';
import MessageController from './controllers/MessageController';
import LikeController from './controllers/LikeController';
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
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const likeController = LikeController.getInstance(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
