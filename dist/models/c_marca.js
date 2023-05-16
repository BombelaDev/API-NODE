"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const MarcaModel = config_1.db.define('c_marca', {
    ID_MARCA: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_MARCA: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    IM_MARCA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 'c_marca',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_MARCA" },
            ]
        },
    ]
});
exports.default = MarcaModel;
//# sourceMappingURL=c_marca.js.map