const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

var corOptions = {
    original: "https://localhost:8081",
}


// Importation des middlewares serveur
app.use(helmet())
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Importation des outils de développement

app.use(morgan("dev"))

// routers

const router = require("./routes/userRouter.js")
app.use("/api/user", router)

//Testing API

app.get('/', (req, res, next) => {
    res.json({ "message": "Hello" })
})

//Portc

const PORT = process.env.SRV_PORT || 3000

// Server

app.listen(PORT, () => {
    console.log(
        `Notre application Node est démarée sur : http://localhost:${PORT}`)
})