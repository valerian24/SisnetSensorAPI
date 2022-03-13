const request = require("request");
const crypto = require("crypto");

function initSys() {
    return new Promise((resolve, reject) => {
        var options = {
            method: "GET",
            url: "https://zipato.sisnet.my.id:443/zipato-web/v2/user/init",
            headers: {},
        };
        request(options, function (error, response) {
            if (!error) {
                resolve(response.body);
            } else {
                reject(response.body);
            }
        });
    });
}

function createToken(password, nonce, callback) {
    const passcryp = crypto.createHash("sha1").update(password).digest("hex");

    const token = crypto
        .createHash("sha1")
        .update(nonce + passcryp)
        .digest("hex");

    return callback(none, token);
}

function pcreateToken(password, nonce) {
    return new Promise((resolve) => {
        const passcryp = crypto
            .createHash("sha1")
            .update(password)
            .digest("hex");
        const token = crypto
            .createHash("sha1")
            .update(nonce + passcryp)
            .digest("hex");
        resolve(token);
    });
}

// async function login(username, password, callback) {
//     var init, jsessionid, nonce;

//     try {
//         init = await initSys();
//     } catch (err) {
//         console.log(err);
//     }

//     jsessionid = JSON.parse(init).jsessionid;
//     nonce = JSON.parse(init).nonce;

//     // const token = createToken(password, nonce, (err, res) => {
//     //     if (err) throw err;
//     //     return res;
//     // });

//     try {
//         token = await pcreateToken(password, nonce);
//     } catch (error) {
//         console.log(error);
//     }

//     var options = {
//         method: "GET",
//         url: `https://zipato.sisnet.my.id:443/zipato-web/v2/user/login?username=${username}&token=${token}`,
//         headers: {
//             Cookie: `JSESSIONID=${jsessionid}`,
//         },
//     };
//     request(options, async function (error, response) {
//         if (!error) {
//             const user = {
//                 username: username,
//                 jsessionid: JSON.parse(response.body).jsessionid,
//                 nonce: JSON.parse(response.body).nonce,
//             };
//             return callback(null, user);
//             // resolve(user);
//         } else {
//             return callback(error, JSON.parse(response.body));
//             // reject(error);
//         }
//     });
// }

function login(username, password) {
    return new Promise(async (resolve, reject) => {
        var init, jsessionid, nonce;

        try {
            init = await initSys();
        } catch (err) {
            console.log(err);
        }

        jsessionid = JSON.parse(init).jsessionid;
        nonce = JSON.parse(init).nonce;

        try {
            token = await pcreateToken(password, nonce);
        } catch (error) {
            console.log(error);
        }

        var options = {
            method: "GET",
            url: `https://zipato.sisnet.my.id:443/zipato-web/v2/user/login?username=${username}&token=${token}`,
            headers: {
                Cookie: `JSESSIONID=${jsessionid}`,
            },
        };
        request(options, async function (error, response) {
            if (!error) {
                const user = {
                    username: username,
                    jsessionid: JSON.parse(response.body).jsessionid,
                    nonce: JSON.parse(response.body).nonce,
                };
                resolve(user);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = { login };
