const express = require("express");
const cors = require("cors");
const port = 3000;
const mainRouter = require("./routes/index");
const app = express();

// these are the middle ware in order to parse the
app.use(cors());
app.use(express.json());
// we need to create router here so we can make our project much more structured
// if we pass the single statement this will gonna a middleware
// if two then a router director

app.use("/api/v1", mainRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});