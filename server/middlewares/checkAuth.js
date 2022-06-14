import jwt from 'jsonwebtoken';
import  Usuario from '../models/Usuario.js';


const checkAuth = async (req, res, next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]; //Bearer <token>

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.usuario = await Usuario.findById(decoded.id).select('-password -__v -token -createdAt -updatedAt -confirmado');

            return next();
        } catch (error) {
            return res.status(401).json({
                msg: 'Token inválido'
            });

        }
    }

    if(!token){
        const error = new Error('No autorizado');
        return res.status(401).json({
            msg: error.message
        });
    }


    next();
}

export default checkAuth;