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
            const { led, pir, buzzer, display, button } = req.body;

            // Validar que todos los parámetros existan
            if (!led || !pir || !buzzer || !display || !button) {
                return res.status(400).send({ message: "Faltan parámetros en el cuerpo de la solicitud" });
            }

            // Crear los objetos con los datos recibidos
            const dataLed = await Data.create({
                sensor: "LED",
                unidad: "color",
                valor: led
            });

            const dataPIR = await Data.create({
                sensor: "PIR",
                unidad: "movimiento",
                valor: pir
            });

            const dataBuzzer = await Data.create({
                sensor: "Buzzer",
                unidad: "sonido",
                valor: buzzer
            });

            const dataDisplay = await Data.create({
                sensor: "Display",
                unidad: "mensaje",
                valor: display
            });

            const dataButton = await Data.create({
                sensor: "Button",
                unidad: "presionado",
                valor: button
            });

            res.send({
                message: "Datos guardados correctamente",
                data: [dataLed, dataPIR, dataBuzzer, dataDisplay, dataButton]
            });

        } catch (error) {
            res.status(500).send({ message: "Error al crear el registro", error });
        }
    }
}

export default DataController;
