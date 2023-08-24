const jwt = require("jsonwebtoken");


const authenticate = (req, res, next) => {
    const token=req.headers.authorization
  
   
    if (token) {
        jwt.verify(token, "masai", (err, decode) => {
            if (decode) {
                //console.log(decode)
                req.body.userId = decode.userID
                next()
            } else {
                res.send({ "msg": "pls login1" })
            }
        })
    } else {
        res.send({ "msg": "pls login2" })
    }
}
module.exports = { authenticate }
