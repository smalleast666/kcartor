
var apiUrl = require('../api/config');

/* login controller */
const forward = function (req, res, next) {
    // if (req.method == "POST") {
    //     var url = apiUrl + req.body.method;
    //     var header = apiUrl + req.body.method;
    //     var form = req.body.data;
    // } else if (req.method == "GET") {
    //     var url = apiUrl + req.query.method;
    //     var form = req.query.data;
    // }
    
    // request({
    //     url: url,
    //     method: req.method,
    //     headers: header,
    //     form: form
    // }, function (err, response, body) {
    //     if (!err && response.statusCode == 200) {
    //         // if (response.headers["api-token"]) {
    //         //     auth["api-token"] = response.headers["api-token"]
    //         //     auth["mnid"] = response.headers["mnid"]
    //         // }
    //         err ? res.send(err) : res.send(response)
    //     }
    // }); 
};

module.exports = forward;