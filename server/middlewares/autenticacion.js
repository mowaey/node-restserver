const jwt = require('jsonwebtoken');

// **************************
//  Token verification
// **************************
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};


// **************************
//  ADMIN_ROLE verification
// **************************
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: 'The user is not admin'
            }
        });
    }

};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}