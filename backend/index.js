const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const postsRoutes = require("./routes/posts.route")

const app = express();
dotenv.config()

// env variable
const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(postsRoutes)


app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})