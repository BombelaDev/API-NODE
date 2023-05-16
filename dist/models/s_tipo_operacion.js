"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const TipoOperacionModel = config_1.db.define('s_tipo_operacion', {
    ID_TIPO_OPERACION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_TIPO_OPERACION: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    NB_TIPO_OPERACION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 's_tipo_operacion',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_TIPO_OPERACION" },
            ]
        },
    ]
});
exports.default = TipoOperacionModel;
//# sourceMappingURL=s_tipo_operacion.js.map