
import sequelize from "../models/database.js"

const getAllProductos = async () => {
    const productos = await sequelize.models.Producto.findAll()
    return productos
}

const getAllAjustes = async () => {
    const ajustes = await sequelize.models.AjusteStock.findAll({ order: [['Id', 'ASC']]})
    return ajustes
}

const createAjuste = async (ajuste) => {
    const resultado = await sequelize.models
    .AjusteStock.create({
        Producto_id: ajuste.Producto_id,
        Fecha: ajuste.Fecha,
        Motivo: ajuste.Motivo,
        CantidadAjuste: ajuste.CantidadAjuste // Corregido: antes decía ajuste.Cantidad
    })
    return resultado
}
export default  {
    getAllAjustes,
    getAllProductos,
    createAjuste,
}