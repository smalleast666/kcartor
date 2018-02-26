
var axios = require('axios');

var apiUrl = require('../api/config');

/* login controller */
const apiproxy = function (req, res, next) {
    // const body = user ? Object.assign({}, req.body, {
    //     accesstoken: user.accessToken
    // }) : req.body
    var url = ""
    req.body.method ? url = req.body.method : url = req.query.method
    // console.log(url)
    delete req.body.method
    axios(apiUrl + url, {
        headers: global.userLogin,
        method: req.method,
        // params: req.query,
        data: req.body,
    }).then(resp => {
        if (resp.status === 200) {
            res.send(resp.data)
        } else {
            res.status(resp.status).send(resp.data)
            console.log(resp);
        }

    }).catch(err => {
        if (err.response) {
            console.log(err.response)
            res.status(500).send(err.response.data)
        } else {
            res.status(500).send({
                success: false,
                msg: '未知错误',
            })
        }
    })

};

module.exports = apiproxy;