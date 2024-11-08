import pool from "../../config/db.js";
import Promocion from  "../../modelos/promociones/promocionModelo.js";
import ExcelJS from "exceljs";


class PromocionControlador{
    static async obtenerPromociones(req,res){
        try{
            const promociones = await Promocion.obtenerTodo();
            res.json({codigo:200, data: promociones});
        }catch(error){
            res.status(500).json({error: error.message});

        }
    }

    
    static async crearPromocion(req, res){
        try {
            const promocion = await Promocion.crear(req.body);
            res.json({codigo:201, mensaje:'Promocion creada con exito',data:promocion});
        } catch (error) {
            res.status(500).json({
                codigo:500,
                error: error.message});
        }
    }

    static async actualizarPromocion(req,res){
        try{
            const { id } = req.params;
            const data = req.body;

            const promocionActualizada = await Promocion.actualizar(id,data);

            if(!promocionActualizada)            
                return res.status(404).json({ message: "Promocion no encontrada" });
            else{
                return  res.json({codigo:200, mensaje:'Promocion actualizada con exito', data:promocionActualizada});
            }

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

static async borrarPromocion(req,res){
    try {
        const promocion = await Promocion.borrar(req.params.id);
        if(!promocion)
            return res.status(404).json({ message: "Promocion no encontrada" });

        return  res.json({codigo:200, mensaje:'Promocion eliminada con exito', data:promocion});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


static async  obtenerPromocionPorId(req,res){
    try{
        
        const promocion = await Promocion.obtenerPromocionId(req.params.id);
        if(!promocion){
            return res.status(404).json({codigo:404, mensaje: "Promocion no encontrada"})
        }
        return res.json({codigo:200,data:promocion})

    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

static async descargarPromocionesExcel(req,res){
    try{
    const promociones = await Promocion.obtenerTodasPromocionesExcel();
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Promociones');
    
    worksheet.columns = [
        {header: 'name',key:  'name', width: 15},
        {header: 'description',key:  'description', width: 15},
        {header: 'discount_type', key: 'discount_type', width: 20},
        {header: 'value', key: 'value', width: 15},
        {header: 'start_date',key:  'start_date', width: 20},
        {header: 'end_date',key:  'end_date', width: 20}
        
        
        
    
    ];
    promociones.forEach(promocion => {worksheet.addRow(promocion);
    });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=ReportePromociones.xlsx');
    
    await workbook.xlsx.write(res);
    res.end();
    }catch(error){
        console.error('Error al generar el archivo Excel:', error);
        
    }
    }

    static async buscarPromocionesFiltro(req,res){
        try{
         
    const filtros = req.params.q
    console.log(`Filtro recibido: ${filtros} ` );
    
    const promociones = await Promocion.obtenerPromocionesFiltro(filtros);
    
    if (promociones.length > 0) { // Verifica si hay promociones en el resultado
        return res.json({ codigo: 200, coincidencias: promociones.length , data: promociones }); // Retorna promociones encontrados
    } else {
        return res.json({ codigo: 404, mensaje: "No hay coincidencias" }); // No se encontraron coincidencias
    }
    } catch (error) {
    res.status(500).json({ mi_mensaje_error: error.message }); // Manejo de errores
    }
    }


}

export default PromocionControlador;