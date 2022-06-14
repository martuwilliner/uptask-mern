import mongoose from "mongoose";

const ProyectoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    fechaEntregada: {
        type: Date,
        required: true,
        default: Date.now()
    },
    cliente: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    colaboradores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }]
},{
    timestamps: true
}
);

const Proyecto = mongoose.model('Proyecto', ProyectoSchema); // Nombre del modelo y el esquema

export default Proyecto;