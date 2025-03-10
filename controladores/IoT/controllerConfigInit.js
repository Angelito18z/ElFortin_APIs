import ConfigInit from "../../modelos/IoT/modelConfigInit.js"; // Importamos el modelo
import Data from "../../modelos/IoT/modelData.js";

class ConfigInitController {
    // Obtener todos los registros
    static async getAll(req, res) {
        try {
            // Obtener los parámetros de la query
            const { led, pir, buzzer, display, button } = req.query;
    
            // Validar que todos los parámetros estén presentes
            if (!led || !pir || !buzzer || !display || !button) {
                return res.status(400).send({ message: "Faltan parámetros en la solicitud" });
            }
    
            const config = await ConfigInit.findOne();
            if (!config) {
                return res.status(404).send({ message: "No se encontró configuración en ConfigInit" });
            }
    
            // Crear documentos en la colección Data basados en los valores de los query params
            const nuevosDatos = await Data.insertMany([
                { sensor: "LED", unidad: "Estado", valor: led },
                { sensor: "PIR", unidad: "Estado", valor: pir },
                { sensor: "Buzzer", unidad: "Estado", valor: buzzer },
                { sensor: "Display", unidad: "Texto", valor: display },
                { sensor: "Button", unidad: "Estado", valor: button }
            ]);
    
            // Enviar la respuesta con los datos obtenidos y los nuevos datos insertados
            res.send(config);
    
        } catch (error) {
            res.status(500).send({ message: "Error al obtener la configuración y crear los datos", error });
        }
    }

    // Actualizar un registro por ID
    static async update(req, res) {
        const id = req.params.id;
        const body = req.body;
        try {
            const respuesta = await ConfigInit.findOneAndUpdate(
                { _id: id },
                body,
                { new: true }
            );
            if (!respuesta) {
                return res.status(404).send({ message: "Registro no encontrado" });
            }
            res.send(respuesta);
        } catch (error) {
            res.status(500).send({ message: "Error al actualizar el registro", error });
        }
    }
}

export default ConfigInitController;