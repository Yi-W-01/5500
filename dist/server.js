"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const cors = require('cors');
const session = require("express-session");
const app = (0, express_1.default)();
// app.use(cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN
// }));
// app.use(cors());
const corsConfig = {
    credentials: true,
    origin: 'http://localhost:3000',
};
app.use(cors(corsConfig));
app.use(express_1.default.json());
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
mongoose_1.default.connect(connectionString);
let sess = {
    secret: process.env.SECRET,
    cookie: {
        secure: false
    }
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
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