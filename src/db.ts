import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_DOCKER_URL = "mongodb://mongoDB/myApp";
const MONGO_URL = "mongodb://localhost:27017/graphTodo";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = (err: Error) => console.log(`❌ Error ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);
