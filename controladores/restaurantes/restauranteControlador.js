import pool from "../../config/db.js";
import Restaurante from "../../modelos/restaurantes/restauranteModelo.js";
import ExcelJS from "exceljs";


class RestauranteControlador{


    static async obtenerRestaurantes(req,res){
        try{
            const restaurantes = await Restaurante.obtenerTodo();
            res.json({codigo:200, data: restaurantes});
        }catch(error){
            res.status(500).json({error: error.message});

        }
    }

    static async crearRestaurante(req, res){
        try {
            const restaurante = await Restaurante.crear(req.body);
            res.json({codigo:201, mensaje:'Restaurante creado con exito',data:restaurante});
        } catch (error) {
            res.status(500).json({codigo:500,error: error.message});
        }
    }

    static async actualizarRestaurante(req,res){
        try{
            const { id } = req.params;
            const data = req.body;

            const restauranteActualizado = await Restaurante.actualizar(id,data);

            if(!restauranteActualizado)            
                return res.status(404).json({ message: "Restaurante no encontrado" });
            else{
                return  res.json({codigo:200, mensaje:'Restaurante actualizado con exito', data:restauranteActualizado});
            }

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

static async borrarRestaurante(req,res){
    try {
        const restaurante = await Restaurante.borrar(req.params.id);
        if(!restaurante)
            return res.status(404).json({ message: "Restaurante no encontrado" });

        return  res.json({codigo:200, mensaje:'Restaurante eliminado con exito', data:restaurante});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


static async  obtenerRestaurantePorId(req,res){
    try{
        
        const restaurante = await Restaurante.obtenerRestauranteId(req.params.id);
        if(!restaurante){
            return res.status(404).json({codigo:404, mensaje: "Restaurante no encontrado"})
        }
        return res.json({codigo:200,data:restaurante})

    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

static async descargarRestaurantesExcel(req,res){
    try{
    const restaurantes = await Restaurante.obtenerTodo();
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Restaurantes');
    
    worksheet.columns = [
        {header: 'name',key:  'name', width: 15},
        {header: 'location',key:  'location', width: 15},
        {header: 'opening_hours',key:  'opening_hours', width: 20}
        
    
    ];
    restaurantes.forEach(restaurante => {worksheet.addRow(restaurante);
    });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Restaurantes.xlsx');
    
    await workbook.xlsx.write(res);
    res.end();
    }catch(error){
        console.error('Error al generar el archivo Excel:', error);
        
    }
    }

    static async buscarRestaurantesFiltro(req,res){
        try{
         
    const filtros = req.params.q
    console.log(`Filtro recibido: ${filtros} ` );
    
    const restaurantes = await Restaurante.obtenerRestaurantesFiltro(filtros);
    
    if (restaurantes.length > 0) { // Verifica si hay restaurantes en el resultado
        return res.json({ codigo: 200, coincidencias: restaurantes.length , data: restaurantes }); // Retorna restaurantes encontrados
    } else {
        return res.json({ codigo: 404, mensaje: "No hay coincidencias" }); // No se encontraron coincidencias
    }
    } catch (error) {
    res.status(500).json({ mi_mensaje_error: error.message }); // Manejo de errores
    }
    }


}
export default RestauranteControlador;