//==============================================================
// *Gestion de la validité du token
//==============================================================
const ctrlToken = require("../utils/jwt")

module.exports = (req, res, next) => {
    let headersAuth = req.headers["authorization"]
    let userId = ctrlToken.getUserId(headersAuth)
    req.userToken = ctrlToken.getUserId(headersAuth)
    if (userId < 0) {
      const message = "Le token est invalide"
      res.status(404).json({message})
    } else {
      next()
    }
};
