import pool from "../../config/db.js";
import Venta from "../../modelos/ventas/ventasModel.js";
import ExcelJS from "exceljs";

class VentaControlador{


    static async obtenerVentas(req,res){
        try{
            const ventas = await Venta.obtenerTodo();
            res.json({codigo:200, data: ventas});
        }catch(error){
            res.status(500).json({error: error.message});

        }
    }

    static async crearVenta(req, res){
        try {
            const venta = await Venta.crear(req.body);
            res.json({codigo:201, mensaje:'Venta creado con exito',data:venta});
        } catch (error) {
            res.status(500).json({codigo:500,error: error.message});
        }
    }

    static async actualizarVenta(req,res){
        try{
            const { id } = req.params;
            const data = req.body;

            const ventaActualizada = await Venta.actualizar(id,data);

            if(!ventaActualizada)            
                return res.status(404).json({ message: "Venta no encontrado" });
            else{
                return  res.json({codigo:200, mensaje:'Venta actualizada con exito', data:ventaActualizada});
            }

    }catch(error){
        res.status(500).json({error: error.message});
    }
}

static async borrarVenta(req,res){
    try {
        const venta = await Venta.borrar(req.params.id);
        if(!venta)
            return res.status(404).json({ message: "Venta no encontrada" });

        return  res.json({codigo:200, mensaje:'Venta eliminada con exito', data:venta});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


static async  obtenerVentaPorId(req,res){
    try{
        
        const venta = await Venta.obtenerVentaId(req.params.id);
        if(!venta){
            return res.status(404).json({codigo:404, mensaje: "Venta no encontrado"})
        }
        return res.json({codigo:200,data:venta})

    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

static async descargarVentasExcel(req,res){
    try{
    const ventas = await Venta.obtenerTodasVentasExcel();
     const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');
    
    worksheet.columns = [
        {header: 'restaurant_name', key: 'restaurant_name', width: 15},
        {header: 'report_date', key: 'report_date', width: 15},
        {header: 'total_sales', key: 'total_sales', width: 20}
    ];
    ventas.forEach(venta => {worksheet.addRow(venta);
    });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Ventas.xlsx');
    
    await workbook.xlsx.write(res);
    res.end();
    }catch(error){
        console.error('Error al generar el archivo Excel:', error);
        
    }
    }

    static async buscarVentasFiltro(req,res){
        try{
         
    const filtros = req.params.q
    console.log(`Filtro recibido: ${filtros} ` );
    
    const ventas = await Venta.obtenerVentasFiltro(filtros);
    
    if (ventas.length > 0) { // Verifica si hay ventas en el resultado
        return res.json({ codigo: 200, coincidencias: ventas.length , data: ventas }); // Retorna ventas encontrados
    } else {
        return res.json({ codigo: 404, mensaje: "No hay coincidencias" }); // No se encontraron coincidencias
    }
    } catch (error) {
    res.status(500).json({ mi_mensaje_error: error.message }); // Manejo de errores
    }
    }


}
export default VentaControlador;