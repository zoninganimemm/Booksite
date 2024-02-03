import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import mongoosDB from "./config/db.js";
import admin from "./routes/admin.js";
import page from "./routes/page.js";
import uploadRouter from "./routes/uploadRouter.js";

dotenv.config();
const port = process.env.PORT;

mongoosDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", page);
app.use("/admin", admin);
app.use("/upload", uploadRouter);

const __dirname = path.resolve();
app.use("/img", express.static(path.join(__dirname + "/img")));
app.use("/PDF", express.static(path.join(__dirname + "/PDF")));
app.listen(port, () => console.log("sever up"));
