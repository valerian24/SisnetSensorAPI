const express = require("express");
const request = require("request");
const router = express.Router();
const auth = require("../reference/auth");

router.get("/", async (req, res) => {
    var jsessionid;

    try {
        const data = await auth.login(req.body.username, req.body.password);
        jsessionid = data.jsessionid;
    } catch (error) {
        console.log(error);
    }

    var options = {
        method: "GET",
        // url: "https://zipato.sisnet.my.id:443/zipato-web/v2/box",
        url: "https://zipato.sisnet.my.id:443/zipato-web/v2/box/list",
        headers: {
            Cookie: `JSESSIONID=${jsessionid}`,
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        res.send(response.body);
    });
});

router.get("/hmm", (req, res) => {
    res.send(acc);
});
module.exports = router;
