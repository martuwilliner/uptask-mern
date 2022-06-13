import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import bcrypt from 'bcrypt';


const registrar = async (req, res) => {

    // Evitar registro de usuarios duplicados
    const existeUsuario = await Usuario.findOne({ email: req.body.email });
    if (existeUsuario) {
        const error = new Error('El usuario ya existe');
        return res.status(400).json({
            msg: error.message
        });

    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId(); //random ID para validar al user por mail
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);

        console.log(usuario);
    } catch (error) {
        console.log(error);
    } 
        
}

const autenticar = async (req, res) => {

    const { email, password } = req.body;
    //Comporbrar si el user existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({
            msg: error.messages
        });
    }
    //Comprobar si el user esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no está confirmada');
        return res.status(403).json({
            msg: error.messages
        });
    }
    //Comprobar su password
    if(await usuario.comprobarPassword(password)) { 
        res.json({
            _id: usuario._id, 
            nombre: usuario.nombre, 
            email: usuario.email,
            
        })
    }else{
        const error = new Error('El password no es correcto'); 
        return res.status(402).json({
            msg: error.messages
        });
    }

}

export { registrar, autenticar };