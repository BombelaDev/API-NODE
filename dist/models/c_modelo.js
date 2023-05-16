"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const ModeloAutoModel = config_1.db.define('c_modelo', {
    ID_MODELO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_MARCA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_marca',
            key: 'ID_MARCA'
        }
    },
    CL_MODELO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_modelo',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_MODELO" },
            ]
        },
        {
            name: "FK_MODELOS_MARCA",
            using: "BTREE",
            fields: [
                { name: "ID_MARCA" },
            ]
        },
    ]
});
exports.default = ModeloAutoModel;
//# sourceMappingURL=c_modelo.js.map