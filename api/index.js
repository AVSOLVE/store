const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const routes = require("./routes");
require("dotenv").config();
const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:4200"
}))
app.use("/api", routes);

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true }).then(() => {
        app.listen(4000, () => console.log("Backend service is up and running!"));
    }).catch((err) => console.log({ error: err }));