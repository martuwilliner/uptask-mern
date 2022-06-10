import mongoose from "mongoose";

const conectarDB = async () => {
    try{
        const connection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        

        const url = `${connection.connection.host}/${connection.connection.port}`;
        console.log(`MongoDB conectada en: ${url} `);
    }
    catch(error){
        console.log(`error: ${error.message}`);
        process.exit(1); // 1 significa que hubo un error
    }
}

export default conectarDB;