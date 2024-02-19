const express = require("express");
const app=express();
const cors=require("cors")
const bodyParser=require("body-parser")

const rootRouter=require("./routes/index");
const { secretKey } = require("./config");

app.use(bodyParser.json())

// enables access to different routes
app.use(cors())

app.use("/api/v1",rootRouter)

app.listen(3000)