const request = require("request");
const auth = require("./reference/auth");

function getBox(callback) {
    var jsessionid;

    try {
        const data = await auth.login(req.body.username, req.body.password);
        jsessionid = data.jsessionid;
    } catch (error) {
        console.log(error);
    }

    var options = {
        method: "GET",
        url: "https://zipato.sisnet.my.id:443/zipato-web/v2/box/list",
        headers: {
            Cookie: `JSESSIONID=${jsessionid}`,
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
    });
}

module.exports = { getBox };
