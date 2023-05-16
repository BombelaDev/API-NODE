"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const ParametroModel = config_1.db.define('s_parametro', {
    ID_PARAMETRO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_PARAMETRO: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    NO_VALOR: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NO_VALOR_JSON: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 's_parametro',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_PARAMETRO" },
            ]
        },
    ]
});
exports.default = ParametroModel;
//# sourceMappingURL=s_parametro.js.map