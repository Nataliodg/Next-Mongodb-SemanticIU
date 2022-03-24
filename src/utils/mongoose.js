import {connect, connection} from 'mongoose';

const connection2 = {
    isConnected: false,
}

//Creamos nuestra conexion a la BD
export async function dbConnect (){

    //Mantener la session con db, para no crear una nueva cada vez que conecte
    if (connection2.isConnected) return;
    
    //Realiza la conexion si ya no existe una previamente
    const db = await connect(process.env.MONGODB_URL)
    
    connection2.isConnected = db.connections[0].readyState

    //Para saber si está conectado
    console.log(db.connection.db.databaseName)
}

//Configuramos para saber lo que sucede en nuestra base de datos;

connection.on("connected", ()=> {
    console.log("Mongodb is connected");
})

connection.on("error", (err)=>{
    console.log(err);
})