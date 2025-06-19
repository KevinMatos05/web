import { DataTypes } from "sequelize";

const ProductoAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
 
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}

const ProductoOptions = {
    timestamps: false
}

export default {
    ProductoAttributes: ProductoAttributes,
    ProductoOptions: ProductoOptions
}
