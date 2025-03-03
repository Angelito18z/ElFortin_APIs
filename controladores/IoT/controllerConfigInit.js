import ConfigInit from "../../modelos/IoT/modelConfigInit.js"; // Importamos el modelo

class ConfigInitController {
    // Obtener todos los registros
    static async getAll(req, res) {
        try {
            const respuesta = await ConfigInit.find();
            res.send(respuesta);
        } catch (error) {
            res.status(500).send({ message: "Error al obtener los datos", error });
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