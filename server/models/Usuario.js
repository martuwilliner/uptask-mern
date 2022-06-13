import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "El password es necesario"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es necesario"],
        trim: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

//Pre se ejecuta antes de guardar la BD  ---- hash password
usuarioSchema.pre('save', async function(next) {
    if(!this.isModified('password')) { //Si no se ha modificado el password que siga. No se ejecuta el hash sobre otro hash
        next();
    }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
}


const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;