
const axios = require('axios')

const apiUrl = require('../api/config');

module.exports = function (req, res) {
    axios.post(`${apiUrl}/admin/login`, req.body)
    .then(resp => {
        if (resp.status === 200) {
            // req.session.user = {
            //     "api-token": resp.headers["api-token"],
            //     mnid: resp.headers.mnid,
            // }
            global.userLogin = {
                "api-token": resp.headers["api-token"],
                mnid: resp.headers.mnid
            }
            res.send(resp.data)
        }
    }).catch(err => {
        res.send()
    })
}
