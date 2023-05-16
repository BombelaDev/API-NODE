"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const SecuenciaModel = config_1.db.define('s_secuencia', {
    CL_SECUENCIA: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    NO_SECUENCIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_PREFIJO: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false
    },
    NO_DIGITOS: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 's_secuencia',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "CL_SECUENCIA" },
            ]
        },
    ]
});
exports.default = SecuenciaModel;
//# sourceMappingURL=s_secuencia.js.map