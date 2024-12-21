import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db.js";
import { shoturl } from "./modules/shortUrl.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//db connection
dbConnection();

const PORT = process.env.PORT;
app.get("/", async (req, res) => {
  const shorturls = await shoturl.find();
  res.status(200).json({ data: shorturls });
});

app.post("/fullurl", async (req, res) => {
  try {
    // console.log(req.body);
    const newUrl = await shoturl.create({
      full: req.body.full,
    });
    // console.log(newUrl);
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ data: error, message: "internal server Error" });
  }
});

app.get("/:shorturl", async (req, res) => {
  try {
    // console.log(req.params.shorturl);
    const shorturl = req.params.shorturl;
    // console.log(shorturl);
    const lasturl = await shoturl.findOne({ short: shorturl });
    if (lasturl == null)
      return res.status(404).json({ message: "uable to find..." });
    lasturl.click += 1;
    await lasturl.save();
    res.redirect(lasturl.full);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`server Running in localhost:${PORT}`));
