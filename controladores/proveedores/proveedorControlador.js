import pool from "../../config/db.js";
import Proveedor from "../../modelos/proveedores/proveedorModelo.js";
import ExcelJS from 'exceljs';

class ProveedorControlador{

    static async obtenerProveedores(req, res){
try{
    const codigo = null;
    const proveedores = await Proveedor.obtenerTodo();
    res.json({codigo: 200,data: proveedores});
}catch (error){
res.status(500).json({error: error.message});
    }
}

static async crearProveedor(req, res){
    try {
        const proveedor = await Proveedor.crear(req.body);
       res.json({codigo: 201,  mensaje: "Proveedor creado con exito", data: proveedor});

    }catch (error){
        res.status(500).json({error: error.message});
            }
}

static async actualizarProveedor(req,res){
    try{       
        const { id } = req.params;
        const data = req.body;

        const proveedorActualizado = await Proveedor.actualizar(id,data);
        
        if(!proveedorActualizado)
            return res.status(404).json({ message: "Proveedor no encontrado" });
          else  {
            
           return res.json({codigo: 200, mensaje: "Proveedor actualizado con exito", data: proveedorActualizado})
        
            }
    }catch (error){
        res.status(500).json({error: error.message});
            }
}

static async borrarProveedor(req,res){
    try{       
        const proveedor = await Proveedor.borrar(req.params.id);
        if(!proveedor){
            return res.status(404).json({codigo: 404,  mensaje: "Proveedor no encontrado"});
        }
        return res.json({codigo:200,mensaje:"Proveedor borrado", data: proveedor })

}catch(error){
    res.status(500).json({error: error.message});
}

}

static async  obtenerProveedorPorId(req,res){
    try{
        
        const proveedor = await Proveedor.obtenerProveedorId(req.params.id);
        if(!proveedor){
            return res.status(404).json({codigo:404, mensaje: "Proveedor no encontrado"})
        }
        return res.json({codigo:200,data:proveedor})

    }catch(error){
        res.status(500).json({ error: error.message });
    }

}

static async descargarProveedoresExcel(req,res){
try{
const proveedores = await Proveedor.obtenerTodo();

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('Proveedores');

worksheet.columns = [
    {header: 'name',key:  'name', width: 15},
    {header: 'contact_info',key:  'contact_info', width: 15},
    {header: 'created_at',key:  'created_at', width: 20}
    

];
proveedores.forEach(proveedor => {worksheet.addRow(proveedor);
});

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
res.setHeader('Content-Disposition', 'attachment; filename=Proveedores.xlsx');

await workbook.xlsx.write(res);
res.end();
}catch(error){
    console.error('Error al generar el archivo Excel:', error);
    
}
}

static async buscarProveedoresFiltro(req,res){
    try{
    
const filtros = req.params.q
console.log(`Filtro recibido: ${filtros} ` );

const proveedores = await Proveedor.obtenerProveedoresFiltro(filtros);

if (proveedores.length > 0) { // Verifica si hay proveedores en el resultado
    return res.json({ codigo: 200, coincidencias: proveedores.length , data: proveedores }); // Retorna proveedores encontrados
} else {
    return res.json({ codigo: 404, mensaje: "No hay coincidencias" }); // No se encontraron coincidencias
}
} catch (error) {
res.status(500).json({ mi_mensaje_error: error.message }); // Manejo de errores
}
}

}
export default ProveedorControlador;