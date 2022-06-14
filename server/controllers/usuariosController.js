import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJsonWebtoken from '../helpers/generarJWT.js';



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
    /* if (!usuario.confirmado) {
        const error = new Error('Tu cuenta no está confirmada');
        return res.status(403).json({
            msg: error.messages
        });
    } */
    //Comprobar su password
    if(await usuario.comprobarPassword(password)) { 
        res.json({
            _id: usuario._id, 
            nombre: usuario.nombre, 
            email: usuario.email,
            token: generarJsonWebtoken(usuario._id)
        })
    }else{
        const error = new Error('El password no es correcto'); 
        return res.status(402).json({
            msg: error.messages
        });
    }

}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error('El token no es válido');
        return res.status(403).json({
            msg: error.message
        });
    }

    try{
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ''; //eliminar el token xq es de un solo uso
        await usuarioConfirmar.save();
        res.json({
            msg: 'Tu cuenta ha sido confirmada'
        })
    }catch(error){
        console.log(error);
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({
            msg: error.message
        });
    }

    try{
        usuario.token = generarId(); //random ID para validar al user por mail
        await usuario.save();
        res.json({
            msg: 'Se ha enviado un email para restablecer tu contraseña'
        })
    }catch(error){
        console.log(error);
    }

}
const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({ token });
    if(tokenValido){
        res.json({
            msg: 'El token es válido'
        })
        
    }
    else{
        const error = new Error('El token no es válido');
        return res.status(403).json({
            msg: error.message
        });
    }

}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({ token });
    if (!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({
            msg: error.message
        });
    }

    try{
        usuario.password = password;
        usuario.token = ''; //eliminar el token xq es de un solo uso
        await usuario.save();
        res.json({
            msg: 'Tu contraseña ha sido restablecida'
        })
    }
    catch(error){
        console.log(error);
    }

}

const perfil = async (req, res) => {
    const { usuario } = req;
    res.json(usuario);
}

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil};