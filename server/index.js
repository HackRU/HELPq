const express = require("express");
const R = require("rambda");

const cors = require("cors");
const bodyParser = require("body-parser");

const dburl = process.env.MENTORQ_DB || "mongodb://localhost:27017";

const app = express();

// middleware

app.use(cors());
app.use(bodyParser.json());

const exampleRoute = (req, res) => {
    res.send("hello");
}

const client = new MongoCLient(url);


app.get("/", exampleRoute);

app.listen(3001);
