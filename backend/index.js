const express = require("express");
require("dotenv").config();
const {connectMongo} = require("./database");
const cors = require("cors")
const path = require("path")

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
})


const router = require("./routes");
app.use("/api", router);

const port = process.env.PORT;

async function startServer(){
    await connectMongo()
    app.listen(port, () => {
        console.log(`Congrats Server running at http://localhost:${port}`)
    })
}

startServer()