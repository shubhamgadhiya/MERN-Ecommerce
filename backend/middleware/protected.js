const jwt = require('jsonwebtoken');

const protected = (req,res,next) => {
    const token = req.headers['authorization'];
    if (!token){
        return res.status(403).send({message:"No token provided."})
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if(err) {
            return res.status(401).send({message:"Unauthorized!"});
        }
                
        console.log('req.user',req.user )
        req.user = user;
        next();

    })
}
module.exports = protected;