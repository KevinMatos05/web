import Sequelize from "sequelize";
import AjusteStock from "./ajusteStock.js";
import Producto from "./producto.js";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './ajustes.db'
})

sequelize.define(
    'AjusteStock',
    AjusteStock.AjusteStockAttributes,
    AjusteStock.AjusteStockOptions
)

sequelize.define(
    'Producto',
    Producto.ProductoAttributes,
    Producto.ProductoOptions
)

try {
    await sequelize.sync()
}
catch (err){
    console.log({msg: err.message})
}

export default sequelize
