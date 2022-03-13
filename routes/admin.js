const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log(global.Array.acc);
    res.send(global.acc);
});

module.exports = router;
