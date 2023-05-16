"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const EstadosGeograficosModel = config_1.db.define('s_estados_geografico', {
    ID_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.CHAR(5),
        allowNull: false
    },
    DS_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    URL_PLACAS_ESTADO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NO_DIGITO_ESTADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_DIGITO_MEDIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_SECUENCIA_SC: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_SECUENCIA_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 's_estados_geografico',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
    ]
});
exports.default = EstadosGeograficosModel;
//# sourceMappingURL=s_estados_geografico.js.map