import Data from "../../modelos/IoT/modelData.js"; // Importamos el modelo

class DataController {
    // Obtener todos los registros
    static async getAll(req, res) {
        try {
            const respuesta = await Data.find();
            res.send(respuesta);
        } catch (error) {
            res.status(500).send({ message: "Error al obtener los datos", error });
        }
    }

    // Crear un nuevo registro
    static async create(req, res) {
        try {
            const { ultrasonico, potenciometro, fotoresistencia } = req.query;
    
            // Validar que todos los parámetros existan
            if (!ultrasonico || !potenciometro || !fotoresistencia) {
                return res.status(400).send({ message: "Faltan parámetros en la URL" });
            }
    
            // Crear los objetos con los datos recibidos
            const dataUltrasonico = await Data.create({
                sensor: "Ultrasonico",
                unidad: "cm",
                valor: parseFloat(ultrasonico)
            });
    
            const dataPotenciometro = await Data.create({
                sensor: "Potenciometro",
                unidad: "Ω",
                valor: parseFloat(potenciometro)
            });
    
            const dataFotoresistencia = await Data.create({
                sensor: "Fotoresistencia",
                unidad: "lux",
                valor: parseFloat(fotoresistencia)
            });
    
            res.send({
                message: "Datos guardados correctamente",
                data: [dataUltrasonico, dataPotenciometro, dataFotoresistencia]
            });
    
        } catch (error) {
            res.status(500).send({ message: "Error al crear el registro", error });
        }
    }
    
}

export default DataController;
