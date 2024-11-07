import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import * as path from "path";
import router from "./src/routes/Routes.js";

import {
  MAX_FILE_SIZE,
  URL_ENCODING,
  REQUEST_LIMIT,
  REQUEST_LIMIT_NUMBER,
  WEB_CACHE,
 
} from "./src/config/config.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: MAX_FILE_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODING }));



const limiter = rateLimit({
  windowMs: REQUEST_LIMIT,
  max: REQUEST_LIMIT_NUMBER,
});
app.use(limiter);


// web cache

app.set("etag ", WEB_CACHE);

//   connect to database

/* 
    mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
*/


// Set API routes
app.use("/api", router);


//  set application storage

app.use (express.static("storage"));


app.get('/', (req, res) => {
    res.send('Hello, World! This is your Express app.');
  });

// Access environment variables
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});