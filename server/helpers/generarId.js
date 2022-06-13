//Generamos ID para enviar por mail y validar al user. NO ES JWT

const generarId = () => {
    const random = Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha;
};

export default generarId;