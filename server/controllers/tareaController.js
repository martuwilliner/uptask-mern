import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

const agregarTarea = async (req, res) => {
    const {proyecto} = req.body;
    const proyectoExiste = await Proyecto.findById(proyecto);
    if (!proyectoExiste) {
        return res.status(404).json({
            msg: "Proyecto no encontrado"
        });
    }

    if(proyectoExiste.creador.toString() !== req.usuario._id.toString()){
        return res.status(401).json({
            msg: "No tienes permiso para agregar tareas a este proyecto"
        });
    }

    try {
        const tareaAlmacenada = new Tarea.create(req.body);
        res.json(tareaAlmacenada);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al agregar tarea"
        });
    }
};
const obtenerTarea = async (req, res) => {};
const actualizarTarea = async (req, res) => {};
const eliminarTarea = async (req, res) => {};
const cambiarEstadoTarea = async (req, res) => {};


export{ agregarTarea, obtenerTarea, actualizarTarea, eliminarTarea, cambiarEstadoTarea };