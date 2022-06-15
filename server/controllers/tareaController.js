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
const obtenerTarea = async (req, res) => {
   const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if (!tarea) {
        return res.status(404).json({
            msg: "Tarea no encontrada"
        });
    }
    
    if (!tarea.proyecto.creador.toString() === req.usuario._id.toString()) {
        return res.status(401).json({
            msg: "No tienes permiso para ver esta tarea"
        });
    }

    res.json(tarea);

};
const actualizarTarea = async (req, res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if (!tarea) {
        return res.status(404).json({
            msg: "Tarea no encontrada"
        });
    }
    
    if (!tarea.proyecto.creador.toString() === req.usuario._id.toString()) {
        return res.status(401).json({
            msg: "No tienes permiso para ver esta tarea"
        });
    }

    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(id, req.body, {new: true});
        res.json(tareaActualizada);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al actualizar tarea"
        });
    }

};
const eliminarTarea = async (req, res) => {
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if (!tarea) {
        return res.status(404).json({
            msg: "Tarea no encontrada"
        });
    }
    
    if (!tarea.proyecto.creador.toString() === req.usuario._id.toString()) {
        return res.status(401).json({
            msg: "No tienes permiso para ver esta tarea"
        });
    }

    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(id);
        res.json(tareaEliminada);
    } catch (error) {
        return res.status(500).json({
            msg: "Error al eliminar tarea"
        });
    }
    
};
const cambiarEstadoTarea = async (req, res) => {};


export{ agregarTarea, obtenerTarea, actualizarTarea, eliminarTarea, cambiarEstadoTarea };