const express = require("express");
const bodyparser = require("body-parser");
const auth = require("./reference/auth");
const boxRoute = require("./routes/box");
const admRoute = require("./routes/admin");
const app = express();

const acc = [];

//ROUTERS
app.use(bodyparser.json());
app.use("/box", boxRoute);
app.use("/admin", admRoute);

app.get("/", async (req, res) => {
    var data;
    try {
        data = await auth.login(req.body.username, req.body.password);
        acc.push(data);
    } catch (error) {
        console.log(error);
    }

    console.log(acc);
    res.send(acc);
});

// LISTENING PORT
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
