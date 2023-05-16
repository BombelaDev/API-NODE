"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const RolCaralianzModel = config_1.db.define('c_rol', {
    ID_ROL: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_ROL: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_JERARQUIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_VENTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_SERVICIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_GERENTE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_TIPO_ABR: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'c_rol',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_ROL" },
            ]
        },
    ]
});
exports.default = RolCaralianzModel;
//# sourceMappingURL=c_rol.js.map