import Proyecto from "../models/Proyecto.js"

const obtenerProyectos = async (req, res) => { // solo de la persona que esta autenticado
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario._id);
    res.json(proyectos);
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;
    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const obtenerProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        return res.status(404).json({
            msg: 'Proyecto no encontrado'
        });
    }

    if(proyecto.creador.toString() !==  req.usuario._id.toString()){
        return res.status(401).json({
            msg: 'No autorizado'
        });
    }

    res.json(proyecto);
}


const editarProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        return res.status(404).json({
            msg: 'Proyecto no encontrado'
        });
    }

    if(proyecto.creador.toString() !==  req.usuario._id.toString()){
        return res.status(401).json({
            msg: 'No autorizado'
        });
    }

    const nuevoProyecto = await Proyecto.findByIdAndUpdate(id, req.body, {new: true});
    res.json(nuevoProyecto);
}

const eliminarProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        return res.status(404).json({
            msg: 'Proyecto no encontrado'
        });
    }

    if(proyecto.creador.toString() !==  req.usuario._id.toString()){
        return res.status(401).json({
            msg: 'No autorizado'
        });
    }

    await Proyecto.findByIdAndRemove(id);
    res.json({msg: 'Proyecto eliminado'});
}

const agregarColaborador = async (req, res) => {}

const eliminarColaborador = async (req, res) => {}

const obtenerTareas = async (req, res) => {}


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}
