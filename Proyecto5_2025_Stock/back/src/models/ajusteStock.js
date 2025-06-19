import { DataTypes, DATE } from "sequelize";

const AjusteStockAttributes = {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoincrement: true
    },
    Producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Fecha: {
        type: DATE,
        allowNull: false,
    },
    Motivo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CantidadAjuste: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}

const AjusteStockOptions = {
    timestamps: false
}

export default {
    AjusteStockAttributes,
    AjusteStockOptions
}
