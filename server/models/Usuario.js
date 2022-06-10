import mongoose from "mongoose";

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

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;